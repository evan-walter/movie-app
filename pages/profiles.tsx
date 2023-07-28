import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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

export default function Profiles() {
	const router = useRouter();
	const { data: user } = useCurrentUser();

	return (
		<div>
			<h1>Who is watching?</h1>
			<button onClick={() => router.push('/')}>{user?.name}</button>
		</div>
	);
}
