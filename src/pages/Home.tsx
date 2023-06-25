import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    return (
        <div>
            <div className="home" style={{ backgroundImage: `url(${"image.jpg"})` }}>
                <div className="headerContainer">
                    <div className='subheaderContainer'>
                    <h1>ThunderDome FrontEnd</h1>
                    </div>
                    <Link to="/org-login">
                    <button>Create an Election</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Home
