import React from 'react'
import "../styles/AboutUs.css"

function AboutUs() {
  return (
    <div className="about">
        
        <div 
        className="sliding-background"
        style={{ backgroundImage: `url(${"image4.jpg"})` } }>
        </div>

        <div className='aboutBottom'>
            <h1> About Our Project</h1>
            <p>Thunderdome is a groundbreaking blockchain-backed voting system project, aiming to revolutionize democratic elections in African nations that have suffered from election fraud for many years with a secure, transparent, and tamper-resistant platform. Developed using the algorand network, it ensures voter security by providing a secure and global mechanism for election managment and result collection. Thunderdome's decentralized design enhances resilience against cyberattacks, fostering trustworthy and accountable elections for a brighter democratic future.
            </p>
        </div>

    </div>
  )
}

export default AboutUs