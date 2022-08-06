import React from 'react';
import PropTypes from 'prop-types';

function GifsListItem({ title, images }) {
	return (
		<div className='col-lg-4 col-md-2'>
			<img
				className='img-fluid my-2'
				src={images['downsized']?.url}
				alt={title}
			/>
		</div>
	);
}

GifsListItem.propTypes = {
	title: PropTypes.string,
	images: PropTypes.object.isRequired,
};

GifsListItem.defaultProps = {
	title: '',
	images: [],
};
export default GifsListItem;
