import { useConfirmBooking } from '@/hooks/booking';
import LoadingSpinner from '@/components/LoadingSpinner';

const BookingWidget = ({ booking }) => {

	const { confirmBooking, confirmBookingLoading } = useConfirmBooking();

	return (
		<div className={`rounded border-2 ${booking.emergency ? 'border-orange-300' : ''}`}>
			{booking.emergency && (
				<div className="bg-orange-300 text-white p-2 rounded mb-2">
					<p className="text-gray-700 text-base">
						Це термінова оренда
					</p>
				</div>
			)}
			<div className='flex justify-between items-center  p-2 my-2'>
				<p className="text-gray-700 text-base">
					{booking.rental_user.username}
				</p>
				<p className="text-gray-700 text-base px-2">
					{`${booking.startDate} - ${booking.endDate}`}
				</p>

				{!booking.emergency && (
					booking.confirmed ? (
						<p className="text-green-600 text-base">
							Підтверджено
						</p>
					) : (
						confirmBookingLoading ? (<LoadingSpinner />) : (
							<button
								className="bg-orange-300 hover:bg-orange-400 text-white text-base py-2 px-4 mb-2 rounded"
								onClick={async () => await confirmBooking(booking.id)}
							>
								Підтвердити
							</button>
						)
					)
				)}
				<button
					className="bg-red-500 hover:bg-red-700 text-white text-base px-1 ml-1 mb-2 rounded"
					onClick={async () => await confirmBooking(booking.id)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

			</div>
		</div>

	)
}

export default BookingWidget