import PropTypes from 'prop-types';

function HandleState({ isLoading, isEmpty, error, config, children }) {
	const { loadingStateElement, emptyStateElement, errorStateElement } =
		config;

	if (isLoading) return loadingStateElement;
	if (isEmpty) return emptyStateElement;
	if (error) return errorStateElement;

	return children;
}

HandleState.propTypes = {
	isLoading: PropTypes.bool,
	isEmpty: PropTypes.bool,
	error: PropTypes.string,
	config: PropTypes.shape({
		loadingStateElement: PropTypes.element,
		emptyStateElement: PropTypes.element,
		errorStateElement: PropTypes.element,
	}).isRequired,
	children: PropTypes.element.isRequired,
};

HandleState.defaultProps = {
	config: {},
};

export default HandleState;
