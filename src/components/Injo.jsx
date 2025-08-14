import React from 'react'

const Injo = () => {
  return (
    <div className="about_info grid">
        <div className="about_box">
        <i className='uil uil-image-plus about_icon'></i>
            <h3 className="about_title">Experiență</h3>
            <span className="about_subtitle">12 Ani</span>
        </div>

        <div className="about_box">
        <i className= 'uil uil-bag about_icon'></i>
            <h3 className="about_title">Completat</h3>
            <span className="about_subtitle">70+ Proiecte</span>
        </div>

        <div className="about_box">
        <i className='uil uil-wrench about_icon'></i>
            <h3 className="about_title">Suport</h3>
            <span className="about_subtitle">Online 24/7</span>
        </div>
    </div>
  )
}

export default Injo