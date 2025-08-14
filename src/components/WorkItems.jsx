/* import React from 'react'

const WorkItems = ({item}) => {
  return (
    <div className="work_card" key={item.id}>
        <img src={item.image} alt='' className='work_img'/>
        <h3 className="work_title">{item.title}</h3>
        <a href="#" className="work_button">
            Demo <i class="uil uil-arrow-up-right work_button-icon"></i>
        </a>
    </div>
  )
}

export default WorkItems */

import React from 'react'

const WorkItems = ({item}) => {
  return (
    <div className={`work_card ${item.status === 'hidden' ? 'work_card--hidden' : ''}`} key={item.id}>
        <div className="work_card_header">
            <img 
            src={`http://localhost:3000${item.imagePath}`} 
            alt={item.title}
            style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '1rem'
          }}
          onError={(e) => {
            e.target.src = '/default-project.jpg'; // Imagine default
          }}
            />
            <div className="work_status_badge">
                <span className={`status_indicator ${item.status}`}>
                    {item.status === 'visible' ? '👁️' : '❌'}
                </span>
            </div>
        </div>
        <h3 className="work_title">{item.title}</h3>
        <p className="work_description">{item.descriere}</p>
        <div className="work_meta">
            <span className={`work_status ${item.status}`}>
                {item.status === 'visible' ? 'Vizibilă' : 'Ascunsă'}
            </span>
        </div>
        <a href={item.link_client || "#"} className="work_button">
            Link Client <i className="uil uil-arrow-up-right work_button-icon"></i>
        </a>
    </div>
  )
}

export default WorkItems