export const API_KEY = 'pWtmbcuVwLAOAcUNU4BwpEUXmpffF9KH';
export const BASE_URL = `https://api.giphy.com/v1/gifs`;
export const ENDPOINT = `/search?api_key=${API_KEY}&rating=r`;
export const LIMIT_RESULTS = 12;

export function createError(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

export async function getGifs(query) {
	try {
		const uri = `${BASE_URL}${ENDPOINT}&q=${query}&limit=${LIMIT_RESULTS}`;
		const res = await fetch(uri);
		if (!res.ok) {
			throw createError(res.statusText, res.status);
		}
		const data = await res.json();
		if (data.meta.status !== 200) {
			throw createError(data.meta.status, data.meta.msg);
		}
		return data.data;
	} catch (error) {
		if (error.status >= 400 && error.status < 500) {
			throw error;
		}
		console.error('oops, something went wrong', error);
	}
}
