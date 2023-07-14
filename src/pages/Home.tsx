import '../styles/Home.css';

import {Link} from 'react-router-dom';
import React from 'react';

function Home() {
    return (
        <div>
            <div className="home" style={{ backgroundImage: `url(${"image.jpg"})` }}>
                <div className="headerContainer">
                    <div className='subheaderContainer'>
                    <h1>ThunderDome FrontEnd</h1>
                    </div>
                    <Link to="/organization-login">
                    <button>Create an Election</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Home
