import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, createUser, waitFor, fireEvent } from '../test-utils';
import Header from '../../components/Header.component';

function renderHeader(props = {}) {
	return render(<Header {...props} />);
}

describe('<Header />', () => {
	const user = createUser();
	const onSearchStub = vi.fn();
	let wrapper = renderHeader({ onSearch: onSearchStub });

	beforeEach(() => {
		wrapper = renderHeader({ onSearch: onSearchStub });
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should be render correctly', () => {
		expect(wrapper.container.firstElementChild).toMatchSnapshot();
		expect(wrapper.getByText(/gifexpert app/i)).toBeInTheDocument();
		expect(wrapper.getByRole('textbox')).toBeInTheDocument();
	});
	it('should be submit form calling onSeach prop', async () => {
		const query = 'goku';

		await user.type(wrapper.getByRole('textbox'), query);
		fireEvent.submit(document.querySelector('form'));

		await waitFor(() => {
			expect(onSearchStub).toBeCalledTimes(1);
			expect(onSearchStub).toBeCalledWith(expect.any(Function)); // expects any function
		});
	});
	it('should not submit form if input field is empty', async () => {
		const query = '    ';

		await user.type(wrapper.getByRole('textbox'), query);
		fireEvent.submit(document.querySelector('form'));

		await waitFor(() => {
			expect(onSearchStub).toBeCalledTimes(0);
		});
	});
});
