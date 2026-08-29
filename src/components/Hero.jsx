import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                {/* Small eyebrow text */}
                <div className="hero-eyebrow">
                    <span className="eyebrow-line"></span>
                    <span>ETHNIC WEAR · VIKHROLI, MUMBAI</span>
                </div>

                {/* Main heading */}
                <h1 className="hero-title">
                    Elegance
                    <br />
                    You’ll <em>Love</em>
                    <br />
                    to Wear
                </h1>

                {/* Description */}
                <p className="hero-description">
                    Handpicked ethnic styles crafted for the modern Indian
                    <br className="desktop-break" />
                    woman.
                </p>

                {/* Buttons */}
                <div className="hero-buttons">
                    <button className="hero-btn hero-btn-primary">
                        <span>SHOP COLLECTION</span>
                        <span className="arrow">→</span>
                    </button>

                    <button className="hero-btn hero-btn-secondary">
                        NEW ARRIVALS
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;