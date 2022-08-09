import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '../test-utils';
import HandleState from '../../components/common/HandleState.component';

function renderComponent(props = {}, child) {
	return render(<HandleState {...props}>{child}</HandleState>);
}

describe('<HandleState />', () => {
	const mockLoadingComponent = <mock-loading />;
	const mockEmptyComponent = <mock-empty />;
	const mockErrorComponent = <mock-error />;
	const mockChildComponent = <mock-child />;

	it('should render loading component provided if isLoading', () => {
		const wrapper = renderComponent(
			{
				isLoading: true,
				config: {
					loadingStateElement: mockLoadingComponent,
				},
			},
			mockChildComponent
		);

		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
	it('should render loading component provided if isEmpty', () => {
		const wrapper = renderComponent(
			{
				isEmpty: true,
				config: {
					emptyStateElement: mockEmptyComponent,
				},
			},
			mockChildComponent
		);

		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
	it('should render loading component provided if have error', () => {
		const wrapper = renderComponent(
			{
				error: true,
				config: {
					errorStateElement: mockErrorComponent,
				},
			},
			mockChildComponent
		);

		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
	it('should render child component if no loading, empty or error state', () => {
		const wrapper = renderComponent(mockChildComponent);

		expect(wrapper.container.firstElementChild).toMatchSnapshot();
	});
});
