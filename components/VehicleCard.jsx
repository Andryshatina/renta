import Image from 'next/image';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import LoadingSpinner from './LoadingSpinner';
import { useDeleteVehicle } from '@/hooks/vehicle';
import BookingWidget from './BookingWidget';
import Link from 'next/link';

const CMS_URL = 'http://127.0.0.1:1337';


const VehicleCard = ({ vehicle, profile = false }) => {

	const { deleteVehicle, deleteVehicleLoading } = useDeleteVehicle();

	const { brand } = profile ? vehicle.brand : vehicle.attributes.brand.data.attributes;
	const { model, price } = profile ? vehicle : vehicle.attributes;
	const photos = profile ? vehicle.photos : vehicle.attributes.photos.data;

	if (!brand || !model || !price || !photos) {
		return <LoadingSpinner />;
	}

	return (
		<>

			<div className="slide-container">
				<Fade indicators={true} autoplay={false} transitionDuration={400}>
					{photos.map((photo) => (
						<div className="image-container" key={photo.id}>
							<Image
								className="w-full"
								src={`${CMS_URL}${profile ? photo.url : photo.attributes.url}`}
								alt={model}
								width={320}
								height={240}
							/>
						</div>
					))
					}
				</Fade>
			</div>
			<div className="px-6 py-4 flex justify-between items-center" >
				<div className="font-bold text-xl mb-2">
					{`${brand} ${model}`}
				</div>
				<p className="text-gray-700 text-base">
					{`${price}₴/день`}
				</p>

			</div>
			<div className=" py-4 flex justify-center">
				<Link
					className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 mb-2 rounded"
					href={`/vehicles/${vehicle.id}`}
				>
					Детальніше
				</Link>
			</div>
			{profile ? (
				<div className="text-xl px-4 text-center">
					{vehicle.bookings.length > 0 ? (
						<p className="font-bold py-2 mb-2">
							Оренди
						</p>
					) : ''}

					{vehicle.bookings.map((booking) => (
						<BookingWidget key={booking.id} booking={booking} />
					))}
					{deleteVehicleLoading ? (<LoadingSpinner />) : (
						<button
							className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 mb-2 mt-3 rounded"
							onClick={async () => await deleteVehicle(vehicle.id)}
						>
							Видалити оголошення
						</button>
					)}
				</div>
			) : ''}

		</>
	);
};

export default VehicleCard;