import { render, cleanup } from '@testing-library/react';
import { beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

beforeEach(cleanup);

export function createUser() {
	// return userEvent instance
	return userEvent.setup();
}

const customRender = (ui, options) =>
	render(ui, { wrapper: ({ children }) => children, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
