'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const router = useRouter();

	const signoutHandler = async () => {
		await signOut();
		redirect('/');
	};

	const signInHandler = async (provider) => {
		await signIn(provider.id);
		redirect('/');
	};

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="assets/images/logo.svg"
					alt="Prompt Lab logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Prompt Lab</p>
			</Link>
			{/*Desktop navigation*/}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							type="button"
							onClick={signoutHandler}
							className="outline_btn">
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile picture"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signInHandler(provider)}
									className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			{/*Mobile View*/}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className="rounded-full"
							alt="profile picture"
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="mt-5 w-full black_btn">
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signInHandler(provider)}
									className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
