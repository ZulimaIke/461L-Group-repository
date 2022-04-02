import { FaBuffer } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import './NavbarElements.css';

//Navigation container - bar style - blue & contains buttons/links
export const NavigationContainer = styled.nav`
background: #414A4A;
height: 150px;
display: flex;
padding-left: 25px;
`;

//Logo
export const NavigationLogo = styled.nav`
padding: 5px;
width: 300px;
font-size: 48px;
color: white;
// background-color: white;
`;
//Navigation links to other pages
export const NavigationLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: .5rem 2rem;
font-size : 20px;
height: 100px;
&.active {
	color: #0EAAB0;
}
`;
//Icon top left corner
export const Buffer = styled(FaBuffer)`
display: 30px;
color: #919191;
`;
//Menu style
export const NavigationMenu = styled.div`
display: flex;
align-items: center;
margin-right: -10px;
`;
//Button for login
export const NavigationButton = styled.nav`
display: flex;
align-items: center;
margin-right: 10px;
}
`;
//Button highlight and action 
export const ButtonPress = styled(Link)`
border-radius: 8px;
background: #919191;
padding: 10px 22px;
color: #000000;

margin-left: 24px;
&:hover {
	background: #fff;
	color: #F1F1F1;
}
`;
