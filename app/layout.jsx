import '@styles/globals.css';
import { Children } from 'react';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
	title: 'Prompt Lab',
	description: 'Discover and share AI prompts',
	author: 'Ganesh Joshi',
	keywords: 'ai, prompts, ai prompts, prompt lab',
	viewport: 'width=device-width, initial-scale=1.0',
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
