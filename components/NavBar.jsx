import Image from 'next/image';
import Link from "next/link";
import { useUser, useSignOut } from '../hooks/user';
import { useRouter } from 'next/router';

const toggleNavbar = () => {
	const nav = document.getElementsByClassName('nav')[0];
	if (nav.className === 'nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto') {
		nav.className = 'nav flex items-center';
	} else {
		nav.className = 'nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto';
	}
}

const countUnconfirmedBookings = (user) => {
	let count = 0;
	for (const vehicle of user.vehicles) {
		for (const booking of vehicle.bookings) {
			if (!booking.confirmed) {
				count++;
			}
		}
	}

	return count;
};

const NavBar = () => {
	const user = useUser();
	const router = useRouter();
	const signOut = useSignOut();

	const unconfirmedBookings = user ? countUnconfirmedBookings(user) : 0;


	const handleSignOut = async () => {
		await signOut();
		router.push('/');
	}

	return (
		<nav className="flex items-center justify-between flex-wrap bg-yellow-50 shadow p-6">
			<div className="flex items-center flex-shrink-0 mr-6">
				<Link href="/">
					<Image
						src="/renta-logo.png"
						alt="Renta Logo"
						width={80}
						height={80}
					/>
				</Link>
				<span className="font-semibold text-xl text-yellow-50 tracking-tight lg:hidden">Car Service</span>
			</div>
			<div className="block lg:hidden">
				<button
					onClick={toggleNavbar}
					className="flex items-center px-3 py-2 border rounded text-orange-600 border-orange-600 hover:text-black hover:border-black"
				>
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div className="nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					{user && (
						<>
							<Link href="/add-vehicle" className="block mt-4 md:text-lg font-semibold lg:inline-block lg:mt-0  hover:text-yellow-600 mr-4">
								Додати авто
							</Link>
							<Link href="/profile" className="block mt-4 md:text-lg font-semibold lg:inline-block lg:mt-0  hover:text-yellow-600 mr-4">
								Профіль {unconfirmedBookings > 0 && <span className="text-red-500">({unconfirmedBookings})</span>}
							</Link>
							<Link href="/my-bookings" className="block mt-4 md:text-lg font-semibold lg:inline-block lg:mt-0  hover:text-yellow-600 mr-4">
								Мої оренди
							</Link>
						</>
					)}
				</div>
				<div>
					{user ? (
						<button
							onClick={handleSignOut}
							className="inline-block md:text-lg font-semibold px-4 py-2 leading-none border rounded border-yellow-200 bg-yellow-200 hover:bg-yellow-300 mt-4 lg:mt-0"
						>
							Вийти
						</button>
					) : (
						<>
							<Link href="/sign-in" className="inline-block md:text-lg font-semibold px-4 py-2 leading-none border rounded border-yellow-200 bg-yellow-200 hover:bg-yellow-300 mt-4 mr-2 lg:mt-0">
								Увійти
							</Link>
							<Link href="/sign-up" className="inline-block md:text-lg font-semibold px-4 py-2 leading-none border rounded border-yellow-200 bg-yellow-200 hover:bg-yellow-300 mt-4 lg:mt-0">
								Зареєструватись
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>

	);
};

export default NavBar;

