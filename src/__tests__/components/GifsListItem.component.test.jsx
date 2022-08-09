import 'vitest';
import '@testing-library/jest-dom';
import { render } from '../test-utils';
import GifsListItem from '../../components/GifsListItem.component';

function renderItem(props = {}) {
	return render(<GifsListItem {...props} />);
}

describe('<GifsListItem />', () => {
	const title = 'testing image';
	const images = {
		downsized: {
			url: 'https://dummyimage.com/360x360/fff/aaa',
		},
	};
	let wrapper = renderItem({
		title,
		images,
	});

	beforeEach(() => {
		wrapper = renderItem({
			title,
			images,
		});
	});

	it('should render element properly', () => {
		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
	it('should image contains an src with the image url and alt with title provided', () => {
		expect(wrapper.getByRole('img')).toHaveAttribute('alt', title);
		expect(wrapper.getByRole('img')).toHaveAttribute(
			'src',
			images.downsized.url
		);
	});
	it('should image contains fluid classname', () => {
		expect(wrapper.getByRole('img')).toHaveClass('img-fluid');
	});
});
