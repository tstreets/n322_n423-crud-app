import React from 'react';
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/Message';
import useGlobalValues from '../useHooks/useGlobalValues';
import BookForm from '../components/BookForm';
import Modal from '../components/Modal';
import Link from 'next/link';

export default function HomePage() {
	const firebase = useFirebase();
	const { booksList, update, error, booksListLoadTime } = useGlobalValues();

	React.useEffect(function () {
		if (!firebase.currentUser.email) return;
		if (Date.now() - booksListLoadTime < 1000 * 60 * 30) return;
		pullBooksFromDb();
	});

	const booksListComponents = booksList.map(book => {
		return (
			<li key={book.id}>
				<div>
					<Link href={`/book/${book.id}`}>{book.name}</Link>
					<button onClick={deleteBook.bind(deleteBook, book.id, book.user)}>Remove</button>
				</div>
			</li>
		);
	});

	async function deleteBook(bookId, userEmail) {
		try {
			if (!firebase.currentUser.email) throw { code: 'auth-failed', name: 'Firebase Auth' };
			if (firebase.currentUser.email !== userEmail) throw { code: 'firestore-unauthorized', name: 'Firebase Firestore' };
			await firebase.removeBook(bookId);
			update({ booksList: booksList.filter(book => book.id !== bookId), error: '' });
		} catch (e) {
			if (e.code === 'auth-failed' && e.name === 'Firebase Auth') {
				update({ error: `${e.name} (${e.code}): You need to login for getting the book list.` });
			} else if (e.code === 'firestore-unauthorized' && e.name === 'Firebase Firestore') {
				update({ error: `${e.name} (${e.code}): You can only edit books that you added.` });
			} else {
				update({ error: e.toString() });
			}
		}
	}

	async function pullBooksFromDb() {
		try {
			if (!firebase.currentUser.email) throw { code: 'auth-failed', name: 'Firebase Auth' };
			const books = await firebase.getBooks();
			update({ booksList: books, error: '', booksListLoadTime: Date.now() });
		} catch (e) {
			if (e.code === 'auth-failed' && e.name === 'Firebase Auth') {
				update({ error: `${e.name} (${e.code}): You need to login for getting the book list.` });
			} else {
				update({ error: e.toString() });
			}
		}
	}

	async function addMyBook(bookDetails) {
		try {
			if (!firebase.currentUser.email) throw { code: 'auth-failed', name: 'Firebase Auth' };
			const newBookDetails = await firebase.addBook({ ...bookDetails, user: firebase.currentUser.email });
			update({ booksList: booksList.concat(newBookDetails) });
		} catch (e) {
			if (e.code === 'auth-failed' && e.name === 'Firebase Auth') {
				update({ error: `${e.name} (${e.code}): You need to login for getting the book list.` });
			} else {
				update({ error: e.toString() });
			}
		}
	}

	return (
		<>
			<h1>My Name: {firebase.currentUser.displayName || '--'}</h1>
			{firebase.currentUser.email ? (
				<>
					<button onClick={pullBooksFromDb}>Refresh Books</button>
					<Modal trigger={<button>Add Book</button>}>
						<BookForm addMyBook={addMyBook} />
					</Modal>

					<ul>{booksListComponents}</ul>
				</>
			) : (
				<></>
			)}
			{error ? (
				<>
					<Message type='error'>{error}</Message>
				</>
			) : (
				<></>
			)}
		</>
	);
}
