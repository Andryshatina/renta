import { useMutation, useQueryClient } from 'react-query';
import { fetchJson } from '../lib/api';

export function useAddReview() {
	const queryClient = useQueryClient();

	const mutation = useMutation(async ({ text, rating, from, to }) => {
		fetchJson('/api/review', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, rating, from, to })
		})
	}
	);
	return {
		addReview: async (text, rating, from, to) => {
			try {
				await mutation.mutateAsync({ text, rating, from, to });
				queryClient.refetchQueries('user');
				return true;
			}
			catch (error) {
				return false;
			}
		},
		addReviewError: mutation.isError,
		addReviewLoading: mutation.isLoading
	}
}
