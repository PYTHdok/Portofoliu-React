import React from 'react'
import './header.css'
import { useState } from 'react';

const Header = () => {

    const [meniu, setMeniu] = useState(false);
    const [activeNav, setActiveNav] = useState("#home");

    if (typeof window !== 'undefined') {
        window.addEventListener("scroll", function () {
            const header = document.querySelector(".header");
            if (header) {
                if (this.scrollY >= 80) {
                    header.classList.add("scroll-header");
                } 
                else {
                    header.classList.remove("scroll-header");
                }
            }
        }) 
    }

  return (
    <header className="header">
        <nav className="nav container">
            <a href="index.html" className="nav_logo">Lorenzo</a>

            <div className={meniu ? "nav_menu show-menu" : "nav_menu"}>
                <ul className="nav_list grid">
                    <li className="nav_item">
                        <a href="#home" onClick={() => setActiveNav ('#home')} className={activeNav === "#home" ?
                            "nav_link active-link" : "nav_link"}>
                            <i className="uil uil-home nav_icon"></i> Home
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="#about" onClick={() => setActiveNav ('#about')} className={activeNav === "#about" ?
                            "nav_link active-link" : "nav_link"}>
                            <i className="uil uil-user nav_icon"></i> About
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="#portfolio" onClick={() => setActiveNav ('#portfolio')} className={activeNav === "#portfolio" ?
                            "nav_link active-link" : "nav_link"}>
                            <i className="uil uil-scenery nav_icon"></i> Portfolio
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="#contact" onClick={() => setActiveNav ('#contact')} className={activeNav === "#contact" ?
                            "nav_link active-link" : "nav_link"}>
                            <i className="uil uil-message nav_icon"></i> Contact
                        </a>
                    </li>
                </ul>

                <i className="uil uil-times nav_close" onClick={() => setMeniu(!meniu)}></i>
            </div>

            <div className="nav_toggle" onClick={() => setMeniu(!meniu)}>
                <i className="uil uil-apps"></i>
            </div>
        </nav>
    </header>
  )
}

export default Header