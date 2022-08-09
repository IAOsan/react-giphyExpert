import { useState, useRef, useCallback, useEffect } from 'react';

function useAsync({ initialValue, asyncFunc, props = [] }) {
	const [data, setData] = useState(initialValue);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { current: initTrackingValues } = useRef({
		initialValue,
		asyncFunc,
		props,
	});

	const execute = useCallback(
		(args) => {
			setData(initTrackingValues.initialValue);
			setIsLoading(true);
			setError(null);

			return initTrackingValues
				.asyncFunc(...args)
				.then((res) => {
					setData(res);
				})
				.catch((error) => {
					setError(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[initTrackingValues]
	);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			execute(initTrackingValues.props);
		}
		return () => {
			isMounted = false;
		};
	}, [execute, initTrackingValues.props]);

	return [data, isLoading, error];
}

export default useAsync;
