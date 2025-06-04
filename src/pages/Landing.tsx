import React from 'react';
import Hero from "../components/landing/Hero.tsx";
import Header from "../components/landing/Header.tsx";
import Service from "../components/landing/Service.tsx";
import Statistics from "../components/landing/Statistics.tsx";
import Footer from "../components/layout/Footer.tsx"; // Fixed import path

const Landing: React.FC = () => {

	return (
		<div className="min-h-screen flex flex-col">
			<Header/>
			<Hero/>
			<Service/>
			<Statistics/>
			<Footer/>
		</div>
	);
};

export default Landing;
