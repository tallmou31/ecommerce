import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content absolute bottom-0 border-t-2 flex justify-between items-center text-white bg-c-green">
    <span className="">© Mouhamed Lamine TALL</span>
    <nav>
      <a href="mailto:Remontée<info@signature.net>?subject=Support">Aide</a>
      <span className="divider"> | </span>
      <a href="https://twitter.com/TalLMomo" target="_blank" rel="noreferrer">
        Contact
      </a>
    </nav>
  </div>
);

export default Footer;
