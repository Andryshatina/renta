import Head from 'next/head';
import NavBar from './NavBar';


const Page = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{`${title} - Renta`}</title>
			</Head>
			<main>
				<NavBar />
				{children}
				{/* <Footer /> */}
			</main>
		</>
	);
}

export default Page;