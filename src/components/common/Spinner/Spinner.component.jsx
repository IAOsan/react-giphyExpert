import React from 'react';
import PropTypes from 'prop-types';
import './spinner.styles.css';

function Spinner({ position }) {
	const containerClassname = `d-flex align-items-center justify-content-${position}`;
	return (
		<div className={containerClassname}>
			<div className='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

Spinner.propTypes = {
	position: PropTypes.string,
};

Spinner.defaultProps = {
	position: 'center',
};

export default Spinner;
