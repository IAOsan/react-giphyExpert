import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '../test-utils';
import GifsList from '../../components/GifsList.component';

let mockData = [];
let mockIsLoading = true;

vi.mock('../../hooks/useAsync', () => ({
	__esModule: true,
	default: vi.fn(() => [mockData, mockIsLoading]),
}));

vi.mock('../../components/common/Spinner', () => ({
	__esModule: true,
	default: vi.fn(() => <p>loading</p>),
}));

function renderList(props = {}) {
	return render(<GifsList {...props} />);
}

describe('<GifsList />', () => {
	const query = 'goku';
	const expectedResponse = [
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
				downsized: {
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
	];

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should be initially loading and render loading component', () => {
		const { getByText } = renderList({ query });

		expect(getByText(query)).toBeInTheDocument();
		expect(getByText(/loading/i)).toBeInTheDocument();
	});
	it('should not be loading and render items from server', () => {
		mockData = expectedResponse;
		mockIsLoading = false;

		const { getByText, queryByText, getAllByRole } = renderList({ query });

		const imagesContainer = document.querySelector('.row');

		expect(getByText(query)).toBeInTheDocument();
		expect(queryByText(/loading/i)).toBeNull();
		expect(imagesContainer.childElementCount).toBe(expectedResponse.length);
		expect(getAllByRole('img')).toHaveLength(expectedResponse.length);
	});
});
