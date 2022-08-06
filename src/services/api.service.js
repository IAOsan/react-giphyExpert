const API_KEY = 'pWtmbcuVwLAOAcUNU4BwpEUXmpffF9KH';
const BASE_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&rating=r`;

function createError(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

export async function getGifs(query, limit = 12) {
	try {
		const res = await fetch(`${BASE_URL}&q=${query}&limit=${limit}`);
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
		console.error('oops', error);
	}
}
