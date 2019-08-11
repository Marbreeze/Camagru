import React from 'react';
import './Toolbar.css';

const toolbar = props =>(
    <header className = "toolbar">
        <nav className = "toolbar__navigation">
            <div></div>
            <div className = "toolbar__logo"> <a href = "/">Camagru</a></div>
            <div className = "spacer"></div>
            <div className = "toolbar_navigation_items">
                <ul>
                    <li><a href = "/"></a>Galerry</li>
                    <li><a href = "/https://www.google.com"></a>Home</li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar