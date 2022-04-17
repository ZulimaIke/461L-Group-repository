import React from 'react';
import './NavbarElements.css';
import {
NavigationContainer,
NavigationLogo,
NavigationLink,
Buffer,
NavigationMenu,
NavigationButton,
ButtonPress,
} from './NavbarElements';

//Navbar containing the different navigation bar eleements 
//Links to pages, menu, container, buttons
const Navbar = () => {
return (
	<>
	<NavigationContainer>
		{/* <Buffer /> */}
		<NavigationLogo>ⒿⒶⓏⓏ____ ____ⒻⒾⓈⒽ</NavigationLogo>
		<NavigationMenu>
		<NavigationLink to='/' activeStyle>
			Home
		</NavigationLink>
		<NavigationLink to='/hardwareCheckout' activeStyle >
			{/* <link>About</link> */}
			Hardware Checkout
		</NavigationLink>
		<NavigationLink to='/postLogin' activeStyle>
			Project Management
		</NavigationLink>
 		</NavigationMenu>
		 <NavigationButton>
		<ButtonPress to='/logout'>Logout</ButtonPress>
		</NavigationButton>
		{/* <NavigationButton>
		<ButtonPress to='/login'>Sign in</ButtonPress>
		</NavigationButton>
        <NavigationButton>
		<ButtonPress to='/createAcc'>Create account</ButtonPress>
		</NavigationButton> */}
	</NavigationContainer>
	</>
);
};

export default Navbar;