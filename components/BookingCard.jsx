import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';
import { useDeleteBooking } from '@/hooks/booking';
import WarningTag from './WarningTag';
import WriteReviewWidget from './WriteReviewWidget';

const CMS_URL = 'http://127.0.0.1:1337';

const calculateTotal = (booking) => {
	const startDate = new Date(booking.startDate);
	const endDate = new Date(booking.endDate);
	const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
	return days * booking.vehicle.price;
};

const BookingCard = ({ booking }) => {

	const { deleteBooking, deleteBookingError, deleteBookingLoading } = useDeleteBooking();

	const handleDelete = () => {
		const valid = deleteBooking(booking.id);
		if (valid) {
			alert('Видалено');
		}
	};

	if (!booking.vehicle) {
		return <LoadingSpinner />;
	}

	return (

		<div className="bg-white rounded-md shadow-md p-4">

			{booking.emergency && (<p className=' text-xl font-semibold text-red-500 underline'>Термінове бронювання</p>)}

			<div className="flex justify-between items-center">
				<h3 className="text-xl font-semibold text-gray-800">{booking.vehicle.brand.brand} {booking.vehicle.model}</h3>
				<span className="text-lg font-semibold text-gray-800">₴{booking.vehicle.price}/день</span>
			</div>

			<div className="flex justify-between items-center mt-2">
				<Image
					className="rounded-full h-10"
					src={`${CMS_URL}${booking.vehicle.photos[0].url}`}
					alt={booking.vehicle.model}
					width={40}
					height={30}
				/>
				{!booking.emergency && (<span className="text-lg font-semibold text-gray-800">Підтверджено: {booking.confirmed ? ('так') : ('ні')}</span>)}
			</div>
			<div className="flex justify-between items-center mt-2">
				<span className="text-lg font-semibold text-gray-800">3: {booking.startDate}</span>
				<span className="text-lg font-semibold text-gray-800">До: {booking.endDate}</span>
			</div>
			<div className="flex justify-between items-center mt-2">
				<span className="text-lg font-semibold text-gray-800">Вартість: {calculateTotal(booking)}₴</span>
				{deleteBookingLoading ? (
					<LoadingSpinner />
				) : (
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
						Видалити
					</button>
				)}
				{deleteBookingError && (<WarningTag>Помилка</WarningTag>)}
			</div>
			<div className="flex justify-between items-center mt-2">
				<span className="text-lg font-semibold text-gray-800">Власник: {booking.vehicle.user_owner.username}</span>
			</div>
			<div className="mt-2">
				<span className="text-lg font-semibold text-gray-800">{`Номер для зв'язку:`} </span>
				{(booking.confirmed || booking.emergency) ? (
					<>
						<span className="text-lg font-semibold text-gray-800">{booking.vehicle.user_owner.phone_number}</span>
						{booking.vehicle.user_owner.telegram && (
							<>
								<span className="text-lg font-semibold text-gray-800"> aбo телеграм: </span>
								<span className="text-lg font-semibold text-gray-800">{booking.vehicle.user_owner.telegram}</span>
							</>)}
					</>
				) : (
					<span className="text-lg  font-semibold text-gray-800">ще не підтверджено</span>
				)}
			</div>

			<WriteReviewWidget userId={booking.vehicle.user_owner.id} />
		</div>
	)
}



export default BookingCard;