import React, { useState } from 'react';
import Header from './components/Header.component';
import GifsList from './components/GifsList.component';

function App() {
	const [queries, setQueries] = useState([]);

	return (
		<main>
			<Header onSearch={setQueries} />
			<div className='container'>
				{queries.map((q) => (
					<GifsList key={q} query={q} />
				))}
			</div>
		</main>
	);
}

export default App;
