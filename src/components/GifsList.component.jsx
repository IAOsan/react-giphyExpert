import React from 'react';
import PropTypes from 'prop-types';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import HandleState from './common/HandleState.component';
import GifsListItem from './GifsListItem.component';
import { getGifs } from '../services/api.service';

function GifsList({ query }) {
	const [images, isLoading, error] = useAsync({
		initialValue: [],
		asyncFunc: getGifs,
		props: [query],
	});

	return (
		<div>
			<h3 className='text-capitalize my-3'>{query}</h3>
			<HandleState
				isLoading={isLoading}
				isEmpty={!isLoading && !images.length}
				error={error?.message}
				config={{
					loadingStateElement: <Spinner />,
					emptyStateElement: <EmptyState />,
					errorStateElement: <ErrorState msg={error?.message} />,
				}}
			>
				<div className='row'>
					{images.map(({ id, title, images }) => (
						<GifsListItem key={id} title={title} images={images} />
					))}
				</div>
			</HandleState>
		</div>
	);
}

function EmptyState() {
	return <p className='text-muted'>No results found :C</p>;
}

function ErrorState({ msg }) {
	return <p className='text-danger'>{msg || 'Something went wrong'}</p>;
}

GifsList.propTypes = {
	query: PropTypes.string.isRequired,
};

export default GifsList;
