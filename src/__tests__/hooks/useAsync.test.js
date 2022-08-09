import { renderHook, waitFor } from '../test-utils';
import useAsync from '../../hooks/useAsync';

describe('useAsync()', () => {
	const initialValue = {};
	const name = 'aaaaa';
	const expectedData = {
		user: name,
		articles: [1, 2, 3, 4, 5],
	};
	const expectedError = 'something wrong';
	const asyncFunc = (name) => {
		return new Promise((res, rej) => {
			if (!name) rej(expectedError);
			res(expectedData);
		});
	};

	it('should be resolve an async function and return their value', async () => {
		const { result } = renderHook(() =>
			useAsync({
				initialValue,
				asyncFunc,
				props: [name],
			})
		);

		expect(result.current[0]).toEqual(initialValue);
		expect(result.current[1]).toEqual(true);
		expect(result.current[2]).toEqual(null);

		await waitFor(() => {
			expect(result.current[0]).toEqual(expectedData);
			expect(result.current[1]).toEqual(false);
			expect(result.current[2]).toEqual(null);
		});
	});
	it('should be catch and return an error if exists', async () => {
		const { result } = renderHook(() =>
			useAsync({
				initialValue,
				asyncFunc,
			})
		);

		expect(result.current[0]).toEqual(initialValue);
		expect(result.current[1]).toEqual(true);
		expect(result.current[2]).toEqual(null);

		await waitFor(() => {
			expect(result.current[0]).toEqual(initialValue);
			expect(result.current[1]).toEqual(false);
			expect(result.current[2]).toEqual(expectedError);
		});
	});
});
