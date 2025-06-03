import React from 'react';
import Header from "../components/Header.tsx";
import HeroSection from "../components/HeroSection.tsx";
import ServicesSection from "../components/ServicesSection.tsx";
import CTASection from "../components/CTASection.tsx";
import Footer from "../components/Footer.tsx";

const Landing: React.FC = () => {

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<HeroSection/>
			<ServicesSection/>
			<CTASection/>
			<Footer/>
		</div>
	);
};

export default Landing;