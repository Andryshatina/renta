import Page from '@/components/Page';
import { useUser } from '@/hooks/user';
import VehicleCard from '@/components/VehicleCard';
import { useState, useEffect } from 'react';
import WarningTag from '@/components/WarningTag';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useQueryClient } from 'react-query';


const Profile = () => {
	const [vehicles, setVehicles] = useState([]);
	const [vehiclesLoading, setVehiclesLoading] = useState(true);
	const user = useUser();
	const queryClient = useQueryClient();
	// const user = queryClient.getQueryData('user');
	useEffect(() => {
		setVehiclesLoading(true);
		if (user) {
			setVehicles(user.vehicles);
			setVehiclesLoading(false);
		}
	}, [user]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			queryClient.refetchQueries('user');
		}, 1500);

		return () => clearTimeout(timeout);
	}, [queryClient]);
	//const user = useUser() || null;

	console.log("user: ", user)
	return (
		<Page title="Profile">

			{user ? (
				<div className="mt-2">
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Інформація про користувача</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">Персональна інформація</p>
						</div>
						<div className="border-t border-gray-200">
							<dl>
								<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">{`Ваше ім'я`}</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
								</div>
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Пошта</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
								</div>

							</dl>
						</div>
					</div>
					<h1 className="text-4xl my-5 ml-5 font-bold text-center">Автомобілі</h1>
					{vehiclesLoading ? (
						<LoadingSpinner />
					) : (
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{vehicles.map((vehicle) => (
								<li
									key={vehicle.id}
									className="max-w-sm rounded overflow-hidden shadow-lg m-5 hover:shadow-xl"
								>
									<VehicleCard vehicle={vehicle} profile={true} />
								</li>
							))}
						</ul>
					)}
				</div>
			) : (
				<WarningTag>
					Необхідно увійти в систему
				</WarningTag>
			)
			}
		</Page>


	)
}

export default Profile;