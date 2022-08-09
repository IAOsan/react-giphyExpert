import 'vitest';
import '@testing-library/jest-dom';
import nock from 'nock';
import { render, createUser, waitFor } from '../test-utils';
import App from '../../App';
import { BASE_URL, ENDPOINT, LIMIT_RESULTS } from '../../services/api.service';

function renderApp() {
	return render(<App />);
}

describe('<App />', () => {
	const user = createUser();
	let wrapper = renderApp();

	beforeEach(() => {
		wrapper = renderApp();
	});

	afterAll(() => {
		if (!nock.isDone()) {
			const pendings = nock.pendingMocks();
			nock.cleanAll();
			throw new Error(
				`some request not reached: ${JSON.stringify(pendings)}`
			);
		}
	});

	it('should be renderer properly', () => {
		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
	it('should add queries through the form and render the results from api', async () => {
		const query = 'dbz';
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
			.get(`${ENDPOINT}&q=${query}&limit=${LIMIT_RESULTS}`)
			.reply(200, expectedResponse);

		const input = wrapper.getByRole('textbox');
		await user.type(input, query);
		await user.keyboard('{Enter>1}');

		await waitFor(() => {
			const allContainers = Array.from(
				document.querySelectorAll('.container')
			);
			const imagesContainer = allContainers[allContainers.length - 1];

			expect(imagesContainer.childElementCount).toBe(
				expectedResponse.data.length
			);
		});
	});
});
