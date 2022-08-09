import React from 'react';
import Form from './common/Form.component';
import PropTypes from 'prop-types';

function Header({ onSearch }) {
	function doSubmit({ query }) {
		if (!query.trim()) return;
		onSearch((prevState) => [query.trim(), ...prevState]);
	}

	return (
		<header className='bg-primary py-4'>
			<div className='container'>
				<h1 className='h2 text-light'>GifExpert App</h1>
				<Form
					fields={[
						{
							type: 'text',
							name: 'query',
							className: 'form-control',
							required: true,
						},
					]}
					onSubmit={doSubmit}
				/>
			</div>
		</header>
	);
}

Header.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default Header;
