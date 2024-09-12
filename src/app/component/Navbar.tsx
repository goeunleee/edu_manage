import styled from "styled-components";
import Logo from "../icons/app_logo.svg";
const Nav = styled.nav`
	background-color: #3b3a48;
	color: #fffff;
	padding: 10px 20px;
	position: fixed;
	width: 100%;
	z-index: 3;
	top: 0;
`;

const NavContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 45px;
`;

const HamburgerButton = styled.button`
	display: none;
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
	color: #fff;

	@media (max-width: 840px) {
		display: block;
	}
`;
const Title = styled.span`
	font-size: 16px;
	display: none;
	color: #fff;
	margin-right: auto;
	margin-left: 20px;
	@media (min-width: 840px) {
		display: block;
	}
`;

interface NavbarProps {
	toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
	return (
		<Nav>
			<NavContent>
				<Logo />
				<Title>EDU.CENTER</Title>
				<HamburgerButton onClick={toggleSidebar}>=</HamburgerButton>
			</NavContent>
		</Nav>
	);
}
