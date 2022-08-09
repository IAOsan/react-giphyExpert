import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, createUser, waitFor, fireEvent } from '../test-utils';
import Form from '../../components/common/Form.component';

function renderForm(props = {}) {
	return render(<Form {...props} />);
}

describe('<Form />', () => {
	const user = createUser();
	const doSubmit = vi.fn();
	const value1 = 'dummy text 1';
	const value2 = 'dummy text 2';
	const inputs = [
		{
			type: 'text',
			name: 'test1',
			id: 'testInput1',
			className: 'form-control',
		},
		{
			type: 'text',
			name: 'test2',
			id: 'testInput2',
			className: 'form-control',
		},
	];
	let wrapper = renderForm({ onSubmit: doSubmit, fields: inputs });

	beforeEach(() => {
		wrapper = renderForm({ onSubmit: doSubmit, fields: inputs });
	});

	it('should render input fields provided', () => {
		expect(wrapper.getAllByRole('textbox')).toHaveLength(2);
	});
	it('should rendered input fields contains attributes provided', () => {
		const [input1, input2] = wrapper.getAllByRole('textbox');

		expect(input1).toHaveAttribute('type', 'text');
		expect(input1).toHaveAttribute('name', 'test1');
		expect(input1).toHaveAttribute('id', 'testInput1');
		expect(input1).toHaveAttribute('class', 'form-control');
		expect(input2).toHaveAttribute('type', 'text');
		expect(input2).toHaveAttribute('name', 'test2');
		expect(input2).toHaveAttribute('id', 'testInput2');
		expect(input2).toHaveAttribute('class', 'form-control');
	});
	it('should be able to write on inputs provided', async () => {
		const [input1, input2] = wrapper.getAllByRole('textbox');

		await user.type(input1, value1);
		await user.type(input2, value2);

		await waitFor(() => {
			expect(input1.value).toBe(value1);
			expect(input2.value).toBe(value2);
		});
	});
	it('should call onSubmit prop when submit form', async () => {
		const [input1, input2] = wrapper.getAllByRole('textbox');

		await user.type(input1, value1);
		await user.type(input2, value2);
		fireEvent.submit(document.querySelector('form'));

		await waitFor(() => {
			expect(doSubmit).toHaveBeenCalledTimes(1);
			expect(doSubmit).toBeCalledWith({
				[input1.name]: value1,
				[input2.name]: value2,
			});
		});
	});
	it('should clear form after submit', async () => {
		const [input1, input2] = wrapper.getAllByRole('textbox');

		await user.type(input1, value1);
		await user.type(input2, value2);
		fireEvent.submit(document.querySelector('form'));

		await waitFor(() => {
			expect(input1.value).toBe('');
			expect(input2.value).toBe('');
			expect(input1).not.toHaveFocus();
			expect(input2).not.toHaveFocus();
		});
	});
});
