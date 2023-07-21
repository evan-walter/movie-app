import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Home() {
	const { data: user } = useCurrentUser();

	return (
		<main>
			<h1 className='underline'>Movie App</h1>
			<p>Logged in as {user?.name}</p>
			<button onClick={() => signOut()}>Logout</button>
		</main>
	);
}
