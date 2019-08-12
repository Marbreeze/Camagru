import React from 'react';
import './Footer.css';



const Footer = (props)=>{
    var d = new Date();
   var currentYear = d.getFullYear();
    return (
    <div>
       <footer className = "footer_primary">
       {/* <a className = "gg_hub" href = 'https://github.com/Marbreeze'>Marina Stratu</a> */}
                    <div className = "column has_txt_right">
                        <div id= "text_content">
                           Enjoy taking pictures and share beautiful moments together
                            </div>
                        <a className = "gg_hub" href = 'https://github.com/Marbreeze'>Marina Stratu</a>
                        <a className = "icon" href= '#'> <i className="fa fa-facebook" ></i></a>
                        <a className = "icon" href = '#'> <i className= "fa fa-twitter"></i></a>
                        <a className = "icon" href = '#'> <i className = "fa fa-instagram"></i></a>
                    </div>
                    <div className = "imprit">
                        <small>&copy;Copyright{currentYear},Marina Stratu</small>
                    </div>
        </footer>
    </div>
    );
};

export default Footer;