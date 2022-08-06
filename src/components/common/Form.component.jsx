import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Form({ onSubmit, fields }) {
	const [formData, setFormData] = useState(() => {
		return initialzeFormData();
	});

	function initialzeFormData() {
		return fields.reduce((acc, f) => {
			acc[f.name] = '';
			return acc;
		}, {});
	}

	function clearForm(form) {
		const elements = form.elements;
		Object.keys(formData).forEach((k) => {
			elements[k].blur();
		});
		setFormData(initialzeFormData());
	}

	function handleChange({ target }) {
		setFormData((prevData) => ({
			...prevData,
			[target.name]: target.value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit(formData);
		clearForm(e.target);
	}

	return (
		<form onSubmit={handleSubmit}>
			{fields.map(({ name, ...rest }, idx) => (
				<div key={idx} className='form-group py-4'>
					<input
						name={name}
						value={formData[name]}
						onChange={handleChange}
						{...rest}
					/>
				</div>
			))}
		</form>
	);
}

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	fields: PropTypes.array.isRequired,
};

Form.defaultProps = {
	fields: [],
};

export default Form;
