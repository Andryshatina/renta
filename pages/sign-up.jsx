import Page from '@/components/Page';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSignUp } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';
import Field from '../components/Field';
import Input from '../components/Input';
import WarningTag from '../components/WarningTag';
import { usernameValidation, phoneValidation, passwordValidation, confirmPasswordValidation } from '../utils/validations';

const SignUp = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [telegram, setTelegram] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validations, setValidations] = useState({
		username: null,
		phone: null,
		password: null,
		confirmPassword: null,
	});


	const { signUp, signUpError, signUpLoading } = useSignUp();

	const handleUsernameValidation = (un) => {
		setUsername(un);
		const isValid = usernameValidation(un);
		setValidations({ ...validations, username: isValid });

	};

	const handlePhoneValidation = (ph) => {
		setPhone(ph);
		const isValid = phoneValidation(ph);
		setValidations({ ...validations, phone: isValid });
	};

	const handlePasswordValidation = (pw) => {
		setPassword(pw);
		const isValid = passwordValidation(pw);
		setValidations({ ...validations, password: isValid });
	};

	const handleConfirmPasswordValidation = (cpw) => {
		setConfirmPassword(cpw);
		const isValid = confirmPasswordValidation(password, cpw);
		setValidations({ ...validations, confirmPassword: isValid });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validations.username || !validations.password || !validations.confirmPassword) {
			return;
		}

		const valid = await signUp(username, email, password, phone, telegram);
		if (valid)
			router.push('/');
	};

	return (
		<Page title="Sign Up">
			<div className="container mx-auto h-full flex justify-center items-center">
				<div className="w-full max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							<h1 className="text-center text-3xl font-bold">Реєстрація</h1>
						</div>
						<Field title="Ваше ім'я">
							<Input type="text" placeholder="Ім'я" value={username} onChange={(e) => handleUsernameValidation(e.target.value)} />
							{validations.username === false && (
								<WarningTag>Має бути від 3 до 20 символів</WarningTag>
							)}
						</Field>
						<Field title="Пошта">
							<Input type="email" placeholder="Ел. Пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Field>
						<Field title="Телефон">
							<input
								type="tel"
								id="phone"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								pattern="\+380\d{9}"
								placeholder="Телефон"
								value={phone}
								onChange={(e) => handlePhoneValidation(e.target.value)}
								required />
							{validations.phone === false && (
								<WarningTag>Невірний формат телефону</WarningTag>
							)}
						</Field>
						<Field title="Телеграм (не обов'язково)">
							<input
								type="text"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								name="telegram"
								placeholder='Телеграм'
								value={telegram}
								onChange={(e) => setTelegram(e.target.value)} />
						</Field>
						<Field title="Пароль">
							<Input type="password" placeholder="Пароль" value={password} onChange={(e) => handlePasswordValidation(e.target.value)} />
							{validations.password === false && (
								<WarningTag>Має бути від 8 до 20 символів</WarningTag>
							)}
						</Field>
						<Field title="Повторіть пароль">
							<Input type="password" placeholder="Повторіть пароль" value={confirmPassword} onChange={(e) => handleConfirmPasswordValidation(e.target.value)} />
							{validations.confirmPassword === false && (
								<WarningTag>Паролі не співпадають</WarningTag>
							)}
						</Field>
						{signUpError && (
							<WarningTag>Помилка реєстрації</WarningTag>
						)}
						<div className="flex items-center">
							<button className="bg-yellow-300 hover:bg-yellow-400 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								{signUpLoading ? <LoadingSpinner /> : 'Зареєструватись'}
							</button>
						</div>
						<div className="mt-3 flex items-center justify-between">
							<Link className="text-yellow-800 hover:text-yellow-700 no-underline" href="/sign-in">
								Вже маєте акаунт?
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Page>
	);
};

export default SignUp;