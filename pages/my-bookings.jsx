import { useUser } from '@/hooks/user';
import { useEffect, useState } from 'react';
import Page from '@/components/Page';
import LoadingSpinner from '@/components/LoadingSpinner';
import BookingCard from '@/components/BookingCard';
import { useQueryClient } from 'react-query';

const MyBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [bookingsLoading, setBookingsLoading] = useState(true);

	const user = useUser();
	const queryClient = useQueryClient();

	useEffect(() => {
		setBookingsLoading(true);
		if (user) {
			setBookings(user.own_bookings);
			setBookingsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			queryClient.refetchQueries('user');
		}, 1500);

		return () => clearTimeout(timeout);
	}, [queryClient]);

	return (
		<Page title="My Bookings">
			<div className="container mx-auto">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Мої оренди</h2>
				{
					bookingsLoading ? (
						<LoadingSpinner />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{
								bookings.map((booking) => (
									<BookingCard key={booking.id} booking={booking} />
								))
							}
						</div>
					)
				}
			</div>
		</Page>
	);
};



export default MyBookings;