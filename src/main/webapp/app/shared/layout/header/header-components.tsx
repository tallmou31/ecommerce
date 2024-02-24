import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon mr-3">
    <img src="content/images/logo.png" alt="Logo" width={40} height={40} />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title !text-c-dark-green">SenCommerce</span>
    <span className="navbar-version">{VERSION}</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center text-white">
      <FontAwesomeIcon icon="home" />
      <span>Accueil</span>
    </NavLink>
  </NavItem>
);

export const MyOrders = () => (
  <NavItem>
    <NavLink tag={Link} to="/my-orders" className="d-flex align-items-center text-white">
      <FontAwesomeIcon icon="shopping-bag" />
      <span>Mes commandes</span>
    </NavLink>
  </NavItem>
);
