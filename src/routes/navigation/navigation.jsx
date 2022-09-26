import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer } from './navigation.styles.jsx';

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to='/shop' >
                SHOP
                </NavLink>
                {
                  currentUser ? (
                    <NavLink onClick={signOutUser}>{' '}SIGN OUT{' '}</NavLink>
                    ) : (
                      <NavLink to='/auth' >
                      SIGN IN
                      </NavLink>
                    )
                }
                <CartIcon />
            </NavLinksContainer>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }
  
export default Navigation;