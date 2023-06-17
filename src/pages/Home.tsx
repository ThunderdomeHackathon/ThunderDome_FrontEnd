import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    return (
        <div>
            <div className="home" style={{ backgroundImage: `url(${"image.jpg"})` }}>
                <div className="headerContainer">
                    <div className='subheaderContainer'>
                    <h1>Valley Farm Secrets</h1>
                    <p>Fresh and Natural Fruit and Veg!</p>
                    </div>
                    <Link to="/products">
                    <button> View Our Products</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Home
