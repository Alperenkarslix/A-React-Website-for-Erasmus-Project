//i want a contact page that sends an email to me

import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';


const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-page">
                <h1>Contact Us</h1>
                <div className="contact-content">
                    <div className="contact-text">
                        <h2>Get in Touch</h2>
                        <p>For any inquiries or collaborations, please don't hesitate to reach out to us. We would love to hear from you!</p>
                        <h2>Our Location</h2>
                        <p>Facultad de Ciencias Pedro Cerbuna, 12. 50009 Zaragoza</p>
                        <p>Secretaría 976761262</p>
                        <p>fteorica.unizar.es</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
    