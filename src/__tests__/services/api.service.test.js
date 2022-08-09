import 'vitest';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import nock from 'nock';
import { waitFor } from '../test-utils';
import {
	BASE_URL,
	ENDPOINT,
	createError,
	getGifs,
} from '../../services/api.service';

describe('createError()', () => {
	const status = 200;
	const msg = 'testing error';

	it('should return an instance of error', () => {
		const result = createError(status, msg);

		expect(result).toBeInstanceOf(Error);
	});
	it('should contains status provided', () => {
		const result = createError(status, msg);

		expect(result.status).toBe(status);
	});
	it('should contains message provided', () => {
		const result = createError(status, msg);

		expect(result.message).toBe(msg);
	});
});

describe('getGifs()', () => {
	const query = 'goku';
	const limit = 10;

	afterEach(() => {
		vi.resetAllMocks();
		if (!nock.isDone()) {
			const pendings = nock.pendingMocks();
			nock.cleanAll();
			throw new Error(`not all request are reached: ${pendings}`);
		}
	});

	it('should send request for images', async () => {
		const expectedResponse = {
			data: [
				{
					type: 'gif',
					id: '19JSJ5ucu91R5D7a3w',
					url: 'https://giphy.com/gifs/TOEIAnimationUK-goku-dragon-ball-super-19JSJ5ucu91R5D7a3w',
					bitly_gif_url: 'https://gph.is/g/Z8J0AqN',
					bitly_url: 'https://gph.is/g/Z8J0AqN',
					embed_url: 'https://giphy.com/embed/19JSJ5ucu91R5D7a3w',
					username: 'ToeiAnimation',
					source: '',
					title: 'Dragon Ball Ultra Instinct GIF by Toei Animation',
					rating: 'g',
					images: {
						original: {
							height: '270',
							width: '480',
							size: '3228300',
							url: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.gif?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.gif&ct=g',
							mp4_size: '514515',
							mp4: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.mp4?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.mp4&ct=g',
							webp_size: '796228',
							webp: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.webp?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.webp&ct=g',
							frames: '41',
							hash: '9f97a6e0fd10b1ca37225f28d151668f',
						},
					},
				},
			],
			pagination: {
				total_count: 831,
				count: 1,
				offset: 0,
			},
			meta: {
				status: 200,
				msg: 'OK',
				response_id: '1js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a',
			},
		};

		nock(BASE_URL)
			.get(`${ENDPOINT}&q=${query}&limit=${limit}`)
			.reply(200, expectedResponse);

		await getGifs(query, limit);

		await waitFor(() => {
			expect(nock.isDone()).toBe(true);
		});
	});
	it('should throw an error if synthetic status response !== 200 ', async () => {
		const expectedResponse = {
			data: [
				{
					type: 'gif',
					id: '19JSJ5ucu91R5D7a3w',
					url: 'https://giphy.com/gifs/TOEIAnimationUK-goku-dragon-ball-super-19JSJ5ucu91R5D7a3w',
					bitly_gif_url: 'https://gph.is/g/Z8J0AqN',
					bitly_url: 'https://gph.is/g/Z8J0AqN',
					embed_url: 'https://giphy.com/embed/19JSJ5ucu91R5D7a3w',
					username: 'ToeiAnimation',
					source: '',
					title: 'Dragon Ball Ultra Instinct GIF by Toei Animation',
					rating: 'g',
					images: {
						original: {
							height: '270',
							width: '480',
							size: '3228300',
							url: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.gif?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.gif&ct=g',
							mp4_size: '514515',
							mp4: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.mp4?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.mp4&ct=g',
							webp_size: '796228',
							webp: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.webp?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.webp&ct=g',
							frames: '41',
							hash: '9f97a6e0fd10b1ca37225f28d151668f',
						},
					},
				},
			],
			pagination: {
				total_count: 831,
				count: 1,
				offset: 0,
			},
			meta: {
				status: 400,
				msg: 'bad request',
				response_id: '1js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a',
			},
		};

		nock(BASE_URL)
			.get(`${ENDPOINT}&q=${query}&limit=${limit}`)
			.reply(200, expectedResponse);

		await expect(getGifs(query, limit)).rejects.toThrow();
	});
	it('should show error in the console if the status code of the error is 500 o higher', async () => {
		const logSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn()); // avoid polluting test output
		const expectedResponse = {
			data: [
				{
					type: 'gif',
					id: '19JSJ5ucu91R5D7a3w',
					url: 'https://giphy.com/gifs/TOEIAnimationUK-goku-dragon-ball-super-19JSJ5ucu91R5D7a3w',
					bitly_gif_url: 'https://gph.is/g/Z8J0AqN',
					bitly_url: 'https://gph.is/g/Z8J0AqN',
					embed_url: 'https://giphy.com/embed/19JSJ5ucu91R5D7a3w',
					username: 'ToeiAnimation',
					source: '',
					title: 'Dragon Ball Ultra Instinct GIF by Toei Animation',
					rating: 'g',
					images: {
						original: {
							height: '270',
							width: '480',
							size: '3228300',
							url: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.gif?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.gif&ct=g',
							mp4_size: '514515',
							mp4: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.mp4?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.mp4&ct=g',
							webp_size: '796228',
							webp: 'https://media3.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.webp?cid=6dacb5291js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a&rid=giphy.webp&ct=g',
							frames: '41',
							hash: '9f97a6e0fd10b1ca37225f28d151668f',
						},
					},
				},
			],
			pagination: {
				total_count: 831,
				count: 1,
				offset: 0,
			},
			meta: {
				status: 500,
				msg: 'bad request',
				response_id: '1js8niot4tsgiy2wo6bndhhi3z94du4vleb8bm6a',
			},
		};

		nock(BASE_URL)
			.get(`${ENDPOINT}&q=${query}&limit=${limit}`)
			.reply(200, expectedResponse);

		await getGifs(query, limit);

		expect(logSpy).toBeCalled();
	});
});
