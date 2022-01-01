import React from 'react';
import HeaderBox from '../Pages/HeaderBox';
import LandingDoctorTitle from '../Pages/LandingDoctorTitle';
import LandingDoctorList from '../Pages/LandingDoctorList';
import Footer from '../Pages/Footer';

const Landing = () => {
    return (
        <div>
            <HeaderBox/>
            <br />
            <LandingDoctorTitle />
            <br />
            <LandingDoctorList />
            <br />
            <Footer />
        </div>
    )
}

export default Landing
