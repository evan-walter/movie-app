import axios from 'axios';
import { useState, useCallback } from 'react';
import Input from '@/components/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const NEW_USER = {
	userType: 'new',
	mainPrompt: 'Register',
	toggleButtonPrompt: 'Already have an account?',
	toggleButtonText: 'Login',
};

const EXISTING_USER = {
	userType: 'existing',
	mainPrompt: 'Login',
	toggleButtonPrompt: 'New here?',
	toggleButtonText: 'Register',
};

export default function Auth() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [variant, setVariant] = useState(EXISTING_USER);

	const login = useCallback(async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/',
			});

			router.push('/');
		} catch (error) {
			console.log(error);
		}
	}, [email, password, router]);

	const register = useCallback(async () => {
		try {
			await axios.post('/api/register', {
				email,
				name,
				password,
			});

			login();
		} catch (error) {
			console.log(error);
		}
	}, [email, name, password, login]);

	return (
		<div>
			<h2>{variant.mainPrompt}</h2>
			{variant.userType === 'new' ? (
				<Input
					label='Name'
					onChange={(e: any) => {
						setName(e.target.value);
					}}
					id='name'
					type='name'
					value={name}
				/>
			) : null}
			<Input
				label='Email'
				onChange={(e: any) => {
					setEmail(e.target.value);
				}}
				id='email'
				type='email'
				value={email}
			/>
			<Input
				label='Password'
				onChange={(e: any) => {
					setPassword(e.target.value);
				}}
				id='password'
				type='password'
				value={password}
			/>
			<button
				onClick={variant.userType === 'new' ? register : login}
				className='rounded-full py-2 px-4 bg-blue-600'
			>
				{variant.mainPrompt}
			</button>
			<button onClick={() => signIn('google', { callbackUrl: '/' })}>
				<FcGoogle size={30} />
			</button>
			<button onClick={() => signIn('github', { callbackUrl: '/' })}>
				<FaGithub size={30} />
			</button>{' '}
			<p>{variant.toggleButtonPrompt}</p>
			<button
				onClick={useCallback(() => {
					setVariant((currVariant) =>
						currVariant.userType === 'new' ? EXISTING_USER : NEW_USER
					);
				}, [])}
			>
				{variant.toggleButtonText}
			</button>
		</div>
	);
}
