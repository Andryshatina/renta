//Nav bar with logo and buttons to sign in and sign up. Styled with tailwindcss.

import Link from "next/link";

const NavBar = () => {
	return (
		<div className="flex justify-between items-center py-4 px-8 bg-white shadow">
			<div className="flex items-center">
				<Link href="/" className="text-2xl font-bold text-gray-800">
					Renta
				</Link>
			</div>
			<div className="flex items-center">
				<Link href="/login" className="text-lg font-semibold text-gray-700 mr-4">
					Sign In
				</Link>
				<Link href="/signup" className="text-lg font-semibold text-gray-700">
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default NavBar;

