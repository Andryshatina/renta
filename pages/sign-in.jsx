import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { use, useState } from 'react';
import { useRouter } from 'next/router';
import { useSignIn, useUser } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';
import WarningTag from '../components/WarningTag';
import Link from 'next/link';

const SignInPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signIn, signInError, signInLoading } = useSignIn();


	const handleSubmit = async (e) => {
		e.preventDefault();
		const valid = await signIn(email, password);
		if (valid) {
			router.push('/');
		}
	};

	return (
		<Page title="Sign In">
			<div className="container mx-auto h-full flex justify-center items-center">
				<div className="w-full max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							<h1 className="text-center text-3xl font-bold">Увійти</h1>
						</div>
						<Field title="Пошта">
							<Input type="email" placeholder="Електронна пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Field>
						<Field title="Пароль">
							<Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Field>
						{signInError && (
							<WarningTag>Неправильні дані</WarningTag>
						)}
						<div className="flex items-center justify-between">
							<button
								className="bg-yellow-300 hover:bg-yellow-400  font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Увійти
							</button>
							{signInLoading && <LoadingSpinner size="sm" />}
						</div>
						<div className="mt-3 flex items-center justify-between">
							<p className="text-yellow-900 text-xs">
								Ще не зареєстровані?

							</p>
							<Link className="text-yellow-700 hover:text-yellow-700 no-underline" href="/sign-up">
								Зареєструватись
							</Link>
						</div>
					</form>
				</div>
			</div>


		</Page>
	);
};

export default SignInPage;