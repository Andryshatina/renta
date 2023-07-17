import { useQuery, useQueryClient, useMutation } from 'react-query';
import { fetchJson } from '../lib/api';

const USER_QUERY_KEY = 'user';


export function useSignIn() {
	const queryClient = useQueryClient();
	const mutation = useMutation(({ email, password }) => fetchJson('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	}));
	return {
		signIn: async (email, password) => {
			try {
				await mutation.mutateAsync({ email, password });
				const user = await fetchJson('/api/user');
				queryClient.setQueryData(USER_QUERY_KEY, user);
				return true;
			}
			catch (error) {
				return false;
			}
		},
		signInError: mutation.isError,
		signInLoading: mutation.isLoading
	}
}

export function useSignUp() {
	const queryClient = useQueryClient();
	const mutation = useMutation(({ username, email, password, phone_number, telegram }) => fetchJson('/api/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password, phone_number, telegram })
	}));
	return {
		signUp: async (username, email, password, phone_number, telegram) => {
			try {
				await mutation.mutateAsync({ username, email, password, phone_number, telegram });
				const user = await fetchJson('/api/user');
				queryClient.setQueryData(USER_QUERY_KEY, user);

				return true;
			}
			catch (error) {
				return false;
			}
		},
		signUpError: mutation.isError,
		signUpLoading: mutation.isLoading
	}
}

export function useSignOut() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async () => {
		await fetchJson('/api/logout');
	});
	return async () => {
		mutation.mutateAsync();
		queryClient.setQueryData(USER_QUERY_KEY, undefined);
	}
}

export function useUser() {
	const query = useQuery(USER_QUERY_KEY, async () => {
		try {
			return await fetchJson('/api/user')
		}
		catch (error) {
			return undefined;
		}
	},
		{
			staleTime: 30000,
			cacheTime: Infinity
		}
	);

	return query.data;
}