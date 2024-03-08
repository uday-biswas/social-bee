import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../common/Footer';

const HomePage = () => {
    return (
        <>
        <section
                className="text-white relative"
            >
                <div className="bg-image"></div>
                <div className="text-center relative z-10 bg-text">
                    <h1 className="text-4xl font-bold">Connecting people, creating communities.</h1>
                    <p className="my-4 text-lg ">Unlock your potential with our social network, empowering connection, inspiring moments.</p>
                    <NavLink to="/dashboard/posts" className="px-6 py-2 bg-yellow-300 text-blue-900 font-bold rounded-full hover:bg-yellow-400 transition duration-300">
                        Get Started
                    </NavLink>
                </div>
        </section>
        <Footer/>
        </>
    );
}

export default HomePage;
