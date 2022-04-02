import React from 'react';
import {
NavigationContainer,
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
		<Buffer />

		<NavigationMenu>
		<NavigationLink to='/' activeStyle>
			Home
		</NavigationLink>
		<NavigationLink to='/about' activeStyle>
			About
		</NavigationLink>
		<NavigationLink to='/images' activeStyle>
			Images
		</NavigationLink>
 		</NavigationMenu>
		<NavigationButton>
		<ButtonPress to='/login'>Sign in</ButtonPress>
		</NavigationButton>
        <NavigationButton>
		<ButtonPress to='/createAcc'>Create account</ButtonPress>
		</NavigationButton>
	</NavigationContainer>
	</>
);
};

export default Navbar;