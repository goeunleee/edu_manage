"use client";

import styled, { ThemeProvider } from "styled-components";
import ClipBoard from "../icons/clip_board.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const theme = {
	colors: {
		background: "#3b3a48",
		hover: "#7b40f2",
		text: "#fff",
	},
	sizes: {
		sidebarWidth: "300px",
		mobileSidebarWidth: "100%",
		navbarHeight: "65px",
	},
	media: {
		mobile: "840px",
	},
};

interface SidebarProps {
	isOpen: boolean;
	isMobile: boolean;
}

const SidebarContainer = styled.div<{ isOpen: boolean; isMobile: boolean }>`
	position: fixed;
	border-top: 1px solid black;
	left: 0;
	top: ${({ theme }) => theme.sizes.navbarHeight};
	height: ${({ isMobile }) => (isMobile ? "fit-content" : "100vh")};
	width: ${({ isMobile, theme }) => (isMobile ? theme.sizes.mobileSidebarWidth : theme.sizes.sidebarWidth)};
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 2;
	transition: ${({ isMobile }) => (isMobile ? "transform 0.3s ease-in-out" : "none")};
	transform: ${({ isMobile, isOpen }) => (isMobile ? (isOpen ? "translateY(0)" : "translateY(-100%)") : "none")};

	@media (min-width: ${({ theme }) => theme.media.mobile}) {
		transform: none;
		transition: none;
	}
`;

const MenuList = styled.ul`
	list-style-type: none;
	padding: 20px;
	color: ${({ theme }) => theme.colors.text};
`;

const MenuItem = styled.li<{ selected: boolean }>`
	padding: 15px;
	border-radius: 10px;
	margin: 10px 0px;
	&:hover {
		background-color: ${({ theme }) => theme.colors.hover};
	}
	background-color: ${({ selected, theme }) => (selected ? theme.colors.hover : "none")};
`;

const MenuLink = styled(Link)`
	color: ${({ theme }) => theme.colors.text};
	text-decoration: none;
	display: flex;
	align-items: center;
`;

export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
	const router = useRouter();
	const handleNavigation = (path: string) => {
		setSelected(path);
		router.push(path);
	};
	const [selected, setSelected] = useState<string>("");
	return (
		<ThemeProvider theme={theme}>
			<SidebarContainer isOpen={isOpen} isMobile={isMobile}>
				<MenuList>
					<MenuItem selected={selected === "/Student"}>
						<MenuLink as="a" onClick={() => handleNavigation("/Student")}>
							<ClipBoard />
							EC Report_STU
						</MenuLink>
					</MenuItem>
					<MenuItem selected={selected === "/Counselor"}>
						<MenuLink as="a" onClick={() => handleNavigation("/Counselor")}>
							<ClipBoard />
							EC Report_CON
						</MenuLink>
					</MenuItem>
				</MenuList>
			</SidebarContainer>
		</ThemeProvider>
	);
}
