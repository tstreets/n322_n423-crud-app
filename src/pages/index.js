import React from 'react';

export default function HomePage() {
	return (
		<>
			<h1>My Name: {process.env.NEXT_PUBLIC_MY_NAME}</h1>
		</>
	);
}
