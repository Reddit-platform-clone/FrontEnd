import React from 'react';
import './footer.css'; // Make sure to create a corresponding CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="column">
        <h4 className='footertitle'>About</h4>
        <ul>
          <li>Blog</li>
          <li>Advertising</li>
          <li>Careers</li>
        </ul>
      </div>

      <div className="column">
        <h4 className='footertitle'>Help</h4>
        <ul>
          <li>Site Rules</li>
          <li>Sarakel Help Center</li>
          <li>Sarakiquette</li>
          <li>Mod Guidelines</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className="column">
        <h4 className='footertitle'>Apps & Tools</h4>
        <ul>
          <li>Sarakel for iPhone</li>
          <li>Sarakel for Android</li>
          <li>Mobile Website</li>
        </ul>
      </div>

      <div className="column">
        <h4 className='footertitle'>Sarakel Premium</h4>
        {/* Add content related to Reddit Premium */}
      </div>
      {/* <div className='copyrighttxt'>
      <p className="copyright">
        Use of this site constitutes acceptance of our User Agreement and Privacy Policy. © 2024 reddit inc. All rights reserved. REDDIT and the ALIEN Logo are registered trademarks of reddit inc.
      </p>
      </div> */}
    </footer>
  );
}

export default Footer;