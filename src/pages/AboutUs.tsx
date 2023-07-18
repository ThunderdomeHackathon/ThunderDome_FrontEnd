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
            <p>Thunderdome is a groundbreaking blockchain-backed voting system project, aiming to revolutionize democracy with a secure, transparent, and tamper-resistant platform. Developed by a skilled team of blockchain experts, it ensures anonymity, real-time auditing, and global accessibility for voters. Thunderdome's decentralized design enhances resilience against cyberattacks, fostering trustworthy and accountable elections for a brighter democratic future.
            </p>
        </div>

    </div>
  )
}

export default AboutUs