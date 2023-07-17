import Page from '../../components/Page';
import { useUser } from '../../hooks/user';
import { ApiError } from '../../lib/api';
import { getVehicle, getVehicles } from '../../lib/vehicles';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import RentVehicleWidget from '@/components/RentVehicleWidget';

const CMS_URL = 'http://127.0.0.1:1337';

export const getStaticPaths = async () => {
	const vehicles = await getVehicles();
	// console.log('getStaticPaths: ', vehicles)

	const paths = vehicles.map((vehicle) => ({
		params: { id: vehicle.id.toString() },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async ({ params: { id } }) => {
	try {
		const vehicle = await getVehicle(id);
		const reviews = await getReviews(vehicle.user_owner.id);
		console.log('getStaticProps', vehicle)


		return {
			props: {
				vehicle,
				reviews,
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

const VehiclePage = ({ vehicle, reviews }) => {
	const user = useUser();
	return (
		<Page title={vehicle.model}>
			<div className="flex flex-col md:flex-row px-6 py-4">
				<div className="md:w-1/2">
					<Fade indicators={true} autoplay={false} transitionDuration={400}>
						{vehicle.photos.data.map((photo) => (
							<div className="image-container" key={photo.id}>
								<Image
									className="w-full"
									src={`${CMS_URL}${photo.attributes.url}`}
									alt={vehicle.model}
									width={320}
									height={240}
								/>
							</div>
						))
						}
					</Fade>
				</div>
				<div className="md:w-1/2 px-6 py-4">
					<div className="font-bold text-2xl mb-2">
						{`${vehicle.brand.name} ${vehicle.model}`}
					</div>
					<p className="text-gray-700 font-semibold text-xl">
						Характеристики:
					</p>
					<div className="text-gray-700 text-base">
						Рік: {vehicle.year}
					</div>
					<div className="text-gray-700 text-base">
						Кількість місць: {vehicle.seats}
					</div>
					<div className="text-gray-700 text-base">
						Кінських сил: {vehicle.horsepower}
					</div>
					<div className="text-gray-700 text-base">
						Електромобіль: {vehicle.electric ? 'Так' : 'Hi'}
					</div>
					<div className="text-gray-700 text-base">
						Власник: {vehicle.user_owner.username}
					</div>
					<div className="text-gray-700 text-base">
						Місто: {vehicle.location.location}
					</div>
					<div className="text-gray-700 text-base">
						Середня оцінка: {reviews.length === 0 ? 'Поки що немає відгуків' : (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2)}
					</div>
					<p className="text-gray-700 font-semibold text-xl">
						Опис:
					</p>
					<p className="text-gray-700 text-base">
						{vehicle.description}
					</p>
					<p className="text-gray-700 text-lg font-bold mt-3">
						{vehicle.price} ₴/добу
					</p>
					{user && user.id !== vehicle.user_owner.id && <RentVehicleWidget vehicleId={vehicle.id} userOwnerId={vehicle.user_owner.id} currUserId={user.id} bookings={vehicle.bookings} />}
				</div>

			</div>

			<div className=" px-6 py-4">
				<p className="text-gray-700 font-semibold text-xl">
					Відгуки:
				</p>
				{reviews.length === 0 && <div className="text-gray-700 text-base">
					Поки що немає відгуків
				</div>}
				{reviews.map((review) => (
					<div className="text-gray-700 text-base border-2 p-2" key={review.id}>
						{review.username} поставив оцінку {review.rating}\5 і написав:
						<div className="text-gray-700 text-base">
							{review.text}
						</div>
					</div>
				))}
			</div>
		</Page>


	);
};

export default VehiclePage;
