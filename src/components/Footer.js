import React from "react";
import "../style/Footer.css";

function Footer(){
    return (

        <footer class="footer-distributed">
			<div class="footer-left">
				<h3>Gas<span>Graphs</span></h3>
				<p class="footer-links">
					<a href="/"class="link-1">Home</a>
					<a href="/"> About</a>
					<a href="/"> Contact</a>
				</p>
			</div>
			<div class="footer-center">
				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>Facultad de Ciencias </span>Pedro Cerbuna, 12. 50009 Zaragoza</p>
				</div>
				<div>
					<i class="fa fa-phone"></i>
					<p>Secretaría 976761262</p>
				</div>
				<div>
					<i class="fa fa-envelope"></i>
					<p>fteorica.unizar.es</p>
				</div>
			</div>
			<div class="footer-right">
				<div class="footer-icons">
					<a href="/"><i class="fa fa-github"></i></a>
				</div>
			</div>
		</footer>
    );
}
export default Footer;