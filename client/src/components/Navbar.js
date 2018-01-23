import React from 'react';

const Navbar = () => (
    
 <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light navBar bg-faded">
        <a className="navbar-brand" href="/">NYT React</a>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item active">
                <a className="nav-link" href="/Search">Search <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                <a className="nav-link" href="/Saved">Saved Articles <span className="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    </nav>

    <div className="jumbotron">
        <h2 className="text-center">New York Times Article Scrubber</h2>
        <p className="text-center">Search for and annotate articles of interest!</p>
    </div>


</div>




);

export default Navbar;