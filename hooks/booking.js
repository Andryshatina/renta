import { useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
import { useQueryClient } from 'react-query';

export function useAddBooking() {
	const queryClient = useQueryClient();

	const mutation = useMutation(async ({ rental_user, user_whom_rented, vehicle, startDate, endDate, emergency }) => {
		fetchJson('/api/addbooking', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ rental_user, user_whom_rented, vehicle, startDate, endDate, emergency })
		})
	}
	);
	return {
		addBooking: async (rental_user, user_whom_rented, vehicle, startDate, endDate, emergency = false) => {
			try {
				await mutation.mutateAsync({ rental_user, user_whom_rented, vehicle, startDate, endDate, emergency });
				queryClient.refetchQueries('user');
				return true;
			} catch (error) {
				console.log('error: ', error);
				return false;
			}
		},
		addBookingError: mutation.isError,
		addBookingLoading: mutation.isLoading
	}
}

export function useConfirmBooking() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async ({ id }) => {
		fetchJson('/api/confirmbooking', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		})
	},
		{ onSuccess: () => queryClient.invalidateQueries('user') }
	);
	return {
		confirmBooking: async (id) => {
			await mutation.mutateAsync({ id });
			queryClient.refetchQueries('user');
		},
		confirmBookingError: mutation.isError,
		confirmBookingLoading: mutation.isLoading
	}
}

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async (id) => {
		await fetchJson(`/api/deletebooking?id=${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		})
	}
	);
	return {
		deleteBooking: async (id) => {
			await mutation.mutateAsync(id);
			queryClient.refetchQueries('user');
		},
		deleteBookingError: mutation.isError,
		deleteBookingLoading: mutation.isLoading
	}
}