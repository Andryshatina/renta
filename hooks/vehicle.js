import { useMutation, useQueryClient } from 'react-query';
import { fetchJson } from '../lib/api';

const CMS_URL = 'http://127.0.0.1:1337';

export function useAddVehicle() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async ({ formData }) => {
		fetchJson(`${CMS_URL}/api/vehicles`, {
			method: 'POST',
			body: formData
		})
	},
		{
			onSuccess: (() => queryClient.refetchQueries('user'))
		}
	);
	return {
		addVehicle: async (formData) => {
			//console.log('formData(hook): ', formData)
			try {
				await mutation.mutateAsync({ formData });
				//queryClient.refetchQueries('user')
				return true;
			}
			catch (error) {
				return false;
			}
		},
		addVehicleError: mutation.isError,
		addVehicleLoading: mutation.isLoading
	}
}

export function useDeleteVehicle() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async (id) => {
		await fetchJson(`/api/vehicle?id=${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		})
	},
		{
			onSuccess: (() => queryClient.invalidateQueries('user'))
		}
	);
	return {
		deleteVehicle: async (id) => {
			await mutation.mutateAsync(id);
		},
		deleteVehicleError: mutation.isError,
		deleteVehicleLoading: mutation.isLoading
	}
}