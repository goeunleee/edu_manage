"use client";
import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled, { ThemeProvider } from "styled-components";

// 테마 설정
const theme = {
	colors: {
		background: "#f5f5f5",
		text: "#000000",
		containerBg: "#ffffff",
	},
	sizes: {
		desktopMarginLeft: "400px",
		mobileMaxWidth: "400px",
		desktopMaxWidth: "1024px",
		padding: "20px",
	},
	media: {
		mobileBreakpoint: "840px",
	},
};

const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.background};
	min-height: 100vh;
	padding-top: 5rem;
	padding-bottom: 8rem;
`;

const Title = styled.h1<{ isMobile: boolean }>`
	font-size: 1.875rem;
	text-align: left;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: 0.625rem;
	width: fit-content;
	margin: ${({ isMobile, theme }) => (!isMobile ? `2.5rem 1.875rem 0 ${theme.sizes.desktopMarginLeft}` : "1rem auto 0rem auto")};
	z-index: 1;

	@media (max-width: ${({ theme }) => theme.media.mobileBreakpoint}) {
		font-size: 1.5rem;
	}
`;

const ContentContainer = styled.div<{ isMobile: boolean }>`
	background-color: ${({ isMobile, theme }) => (!isMobile ? theme.colors.containerBg : theme.colors.background)};
	max-width: ${({ isMobile, theme }) => (!isMobile ? theme.sizes.desktopMaxWidth : theme.sizes.mobileMaxWidth)};
	border-radius: 10px;
	padding: ${({ theme }) => theme.sizes.padding};
	margin: ${({ isMobile, theme }) => (!isMobile ? `2.5rem 1.875rem 3rem ${theme.sizes.desktopMarginLeft}` : "2rem auto")};

	@media (max-width: ${({ theme }) => theme.media.mobileBreakpoint}) {
		// margin: 3rem auto;
		background-color: ${({ theme }) => theme.colors.background};
	}
`;

interface WrapperProps {
	isSidebarOpen: boolean;
	isMobile: boolean;
	children: ReactNode;
}

export default function ContentWrapper({ children }: WrapperProps) {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	const getTitle = () => {
		switch (pathname) {
			case "/Counselor":
				return "EC Report Details(COU)";
			case "/Student":
				return "EC Report Details(STU)";
			default:
				return "EC Report Details";
		}
	};

	const handleSize = () => {
		const isMobileView = window.innerWidth <= 840;
		setIsMobile(isMobileView);
		setIsSidebarOpen(!isMobileView);
	};

	useEffect(() => {
		handleSize();
		window.addEventListener("resize", handleSize);
		return () => {
			window.removeEventListener("resize", handleSize);
		};
	}, []);

	if (isMobile === null) return null;

	return (
		<ThemeProvider theme={theme}>
			<Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
			<Sidebar isOpen={isSidebarOpen} isMobile={isMobile} />
			<Wrapper>
				<Title isMobile={isMobile}>{getTitle()}</Title>
				<ContentContainer isMobile={isMobile}>{children}</ContentContainer>
			</Wrapper>
		</ThemeProvider>
	);
}
