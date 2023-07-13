// home page
import React from 'react';
import Chart from '../components/Chart';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';

const Home = () => {
    return (
        <div>
        <div>
            <Navbar />
        </div>
        <div className="home-page">
            <div className="home-content">
            <div className="home-text">
                <h1>Gas Graps</h1>
            </div>
            </div>
        </div>
        <div>
            <ul>
                <li> <Chart /></li>
            </ul>
        </div>
        <div>
            <Footer />
        </div>
        </div>
    );
};

export default Home;
