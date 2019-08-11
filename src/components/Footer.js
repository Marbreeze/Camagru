import React from 'react';
import './Footer.css';

const Footer = (props)=>{
    return (
    <div>
       <footer className = "footer_primary">
            {/* {<div className = "foot_container"> */}
                        {/* <p className = "description">this is myyyyyyyyyyyyyy foot</p>} */}
                    <div className = "column has_txt_right">
                        <a className = "icon" href= '#'> <i className="fa fa-facebook" ></i></a>
                        <a className = "icon" href = '#'> <i className= "fa fa-twitter"></i></a>
                        <a className = "icon" href = '#'> <i className = "fa fa-instagram"></i></a>
                    </div>
                    {/* { </div> } */}
        </footer>
    </div>
    );
};

export default Footer;