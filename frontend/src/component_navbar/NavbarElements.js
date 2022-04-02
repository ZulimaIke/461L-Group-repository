import { FaBuffer } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

//Navigation container - bar style - blue & contains buttons/links
export const NavigationContainer = styled.nav`
background: #33F7FF;
height: 100px;
display: flex;
`;

//Navigation links to other pages
export const NavigationLink = styled(Link)`
color: #919191;
display: flex;
align-items: center;
padding: 0 2rem;
&.active {
	color: #000000;
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
