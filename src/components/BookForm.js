import React from 'react';

export default function BookForm({ addMyBook }) {
	const [bookDetails, setBookDetails] = React.useState({
		name: '',
		year: 2000,
	});

	async function submitForm(e) {
		e.preventDefault();
		addMyBook(bookDetails);
	}

	function updateBookDetails(e) {
		const { value, name } = e.currentTarget;
		setBookDetails({ ...bookDetails, [name]: value });
	}

	return (
		<>
			<form onSubmit={submitForm}>
				<div>
					<label>Book Name:</label>
					<input name='name' type='text' value={bookDetails.name} onChange={updateBookDetails} />
				</div>
				<div>
					<label>Book Year:</label>
					<input name='year' type='number' step='1' value={bookDetails.year} onChange={updateBookDetails} />
				</div>
				<div>
					<button type='submit'>Add</button>
				</div>
			</form>
		</>
	);
}
