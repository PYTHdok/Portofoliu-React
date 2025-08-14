import React from 'react'

const Data = () => {
  return (
    <div className="home_data">
        <h1 className="home_title">Lorenzo Falcone
            <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="home_hand"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4V8L15.5 9.5C16.3 10.3 16.3 11.7 15.5 12.5L12 16L8.5 12.5C7.7 11.7 7.7 10.3 8.5 9.5L10 8V4C10 2.9 10.9 2 12 2Z"
                    fill="var(--title-color)"
                  />
                  <path
                    d="M12 16L8 20H16L12 16Z"
                    fill="var(--title-color)"
                  />
                  <circle cx="12" cy="12" r="2" fill="var(--container-color)" />
                </svg>
        </h1>
        <h3 className="home_subtitle">Artist Digital</h3>
        <p className="home_description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, similique.</p>

        <a href="#contact" className="button button--flex">
            Contactează-mă
            <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="button_icon"
                >
                  <path
                    d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="currentColor"
                  />
                </svg>
        </a>
    </div>
  )
}

export default Data