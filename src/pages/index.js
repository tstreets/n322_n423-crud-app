import React from 'react';
import useFirebase from '../useHooks/useFirebase';

export default function HomePage() {
	const firebase = useFirebase();
	const [booksList, setBooksList] = React.useState([]);

	const booksListComponents = booksList.map(book => {
		return <li key={book.id}>{book.name}</li>;
	});

	async function pullBooksFromDb() {
		const books = await firebase.getBooks();
		setBooksList(books);
	}

	return (
		<>
			<h1>My Name: {firebase.currentUser.displayName || '--'}</h1>
			<button onClick={pullBooksFromDb}>Get Books</button>
			<ul>{booksListComponents}</ul>
		</>
	);
}
