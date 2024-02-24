import './header.scss';

import React, { useMemo, useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, MyOrders } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from 'app/config/store';
import { ICartItem } from 'app/shared/reducers/cart';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardItems: ICartItem[] = useAppSelector(state => state.cart.items);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cartNb = useMemo(() => {
    let nb = 0;
    cardItems.forEach(i => {
      nb += i.quantity;
    });
    return nb;
  }, [cardItems]);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar !bg-c-green">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto !bg-c-green" navbar>
            <Home />
            {props.isAuthenticated && <MyOrders />}

            {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
            )}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
        <Link to={'/cart'} className="ml-2">
          <Badge count={cartNb} size={'small'} color="#00807f">
            <ShoppingCartOutlined className="mt-1" rev={'shop'} style={{ fontSize: 24 }} />
          </Badge>
        </Link>
      </Navbar>
    </div>
  );
};

export default Header;
