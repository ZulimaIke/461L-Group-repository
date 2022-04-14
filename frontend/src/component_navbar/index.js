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
		<NavigationLink to='/about' activeStyle >
			{/* <link>About</link> */}
			About
		</NavigationLink>
		<NavigationLink to='/postLogin' activeStyle>
			Post login
		</NavigationLink>
 		</NavigationMenu>
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