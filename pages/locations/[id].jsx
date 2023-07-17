import Page from '../../components/Page';
import { ApiError } from '../../lib/api';
import { getLocation, getLocations } from '../../lib/locations';
import VehicleCard from '@/components/VehicleCard';
import { useEffect, useState } from 'react';
import VehicleFilterWidget from '@/components/VehicleFilterWidget';
import { getBrands } from '@/lib/brands';
import Link from 'next/link';


export const getStaticPaths = async () => {
	const locations = await getLocations();
	//console.log('getStaticPaths: ', locations)

	const paths = locations.map((location) => ({
		params: { id: location.id.toString() },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async ({ params: { id } }) => {
	try {
		const location = await getLocation(id);
		//console.log('getStaticProps', location)
		const brands = await getBrands();
		//console.log('brands: ', brands)
		return {
			props: {
				location,
				brands,
			},
			revalidate: parseInt(process.env.REVALIDATE_SECONDS),
		};
	}
	catch (error) {
		if (error.status === 404 && error instanceof ApiError) {
			return {
				notFound: true,
			};
		}
		throw error;
	}
}

const LocationPage = ({ location, brands }) => {

	const [vehicles, setVehicles] = useState([]);
	const [openedFilter, setOpenedFilter] = useState(false);

	useEffect(() => {
		setVehicles(location.vehicles.data);
	}, [location.vehicles.data])

	const handleFilterChange = (filteredVehicles) => {
		setVehicles(filteredVehicles);
	}
	//const user = useUser();
	return (
		<Page title={location.location}>
			<h1 className="text-4xl my-5 ml-5 font-bold">Автомобілі {location.location}</h1>

			<button
				className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-2 md:px-4 ml-5 rounded"
				onClick={() => setOpenedFilter(!openedFilter)}
			>
				{openedFilter ? 'Закрити фільтри' : 'Відкрити фільтри'}
			</button>

			<Link href="/" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-2 md:px-4 ml-5 rounded">
				Назад до списку локацій
			</Link>

			{openedFilter && <VehicleFilterWidget brands={brands} vehicles={location.vehicles.data} handleFilterChange={handleFilterChange} />}

			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{vehicles.map((vehicle) => (
					<li
						key={vehicle.id}
						className="max-w-sm rounded overflow-hidden shadow-lg m-5 hover:shadow-xl"
					>
						<VehicleCard vehicle={vehicle} />
					</li>
				))}
			</ul>
		</Page>


	);
};

export default LocationPage;
