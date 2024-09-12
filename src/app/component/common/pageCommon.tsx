import styled from "styled-components";
import Link_Icon from "../../icons/link.svg";
import Check_Icon from "../../icons/check.svg";
import Filter_Icon from "../../icons/filter.svg";

export const theme = {
	colors: {
		text: "#000",
		border: "#e6e9ec",
		background: "#ffffff",
		highlight: "rgba(151, 71, 255, 0.2)",
		divider: "#b3b3b3",
		violet: "#7a40f2",
		main_dark: "#3B3A48",
	},
	fontSize: { desktop: "1.125rem", mobile: "1rem" },
	borderRadius: "10px",
	padding: "20px",
	gap: "40px",
};

export const Container = styled.div`
	padding: ${theme.padding};
	position: relative;
`;
export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: ${theme.gap};
	margin: 40px 0;
	@media (max-width: 840px) {
		grid-template-columns: 1fr;
		background-color: ${theme.colors.background};
		padding: 20px;
		border-radius: 10px;
	}
`;
export const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
`;

export const Check = styled(Check_Icon)`
	@media (min-width: 840px) {
		display: none;
	}
`;
export const Filter = styled(Filter_Icon)`
	@media (min-width: 840px) {
		display: none;
	}
`;
type BtnTheme = "dark" | "primary" | "primary_active";

interface ButtonProps {
	btnTheme: BtnTheme;
}
export const Button = styled.button<ButtonProps>`
	box-sizing: border-box;
	width: 147px;
	height: 54px;
	font-size: 1.125rem;
	font-weight: bold;
	background: ${({ btnTheme }) =>
		btnTheme === "primary_active" ? theme.colors.background : btnTheme === "dark" ? theme.colors.main_dark : theme.colors.violet};
	border: 1px solid ${({ btnTheme }) => (btnTheme === "primary" || btnTheme === "primary_active" ? theme.colors.violet : theme.colors.main_dark)};
	border-radius: ${theme.borderRadius};
	color: ${({ btnTheme }) => (btnTheme === "primary_active" ? theme.colors.violet : theme.colors.background)};
	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;

	&:hover {
		background: ${({ btnTheme }) => (btnTheme === "primary_active" ? theme.colors.violet : theme.colors.background)};
		color: ${({ btnTheme }) => (btnTheme === "dark" ? theme.colors.main_dark : btnTheme === "primary_active" ? theme.colors.background : theme.colors.violet)};
		border-color: ${({ btnTheme }) => (btnTheme === "dark" ? theme.colors.main_dark : theme.colors.violet)};
	}
`;

export const PrimaryPCButton = styled(Button)`
	@media (min-width: 840px) {
		display: block;
	}
	@media (max-width: 840px) {
		display: none;
	}
`;
export const PrimaryMobileButton = styled(Button)`
	@media (min-width: 840px) {
		display: none;
	}
	@media (max-width: 840px) {
		display: block;
	}
`;
export const DarkMobileButton = styled(Button)`
	@media (min-width: 840px) {
		display: none;
	}
	@media (max-width: 840px) {
		display: block;
	}
`;

export const Label = styled.span`
	font-weight: bold;
	font-size: ${theme.fontSize.desktop};
	color: ${theme.colors.text};
	@media (max-width: 840px) {
		font-size: ${theme.fontSize.mobile};
	}
`;

export const Value = styled.span`
	font-size: ${theme.fontSize.desktop};
	color: ${theme.colors.text};
	@media (max-width: 840px) {
		font-size: ${theme.fontSize.mobile};
	}
`;

export const ActivityContainer = styled.div`
	background: ${theme.colors.background};
	border: 1px solid ${theme.colors.border};
	border-radius: ${theme.borderRadius};
	padding: 30px 50px;
	margin: 10px 0;

	@media (max-width: 840px) {
		padding: 20px;

		.title {
			font-size: 1.125rem;
		}
	}

	.title {
		display: flex;
		font-size: 1.25rem;
		font-weight: bold;
		gap: 10px;
		margin: 0 0 10px 0;
		color: ${theme.colors.text};
	}

	.label {
		font-weight: bold;
		font-size: 1.125rem;
		color: ${theme.colors.text};
	}

	.value {
		font-weight: normal;
		font-size: 1.125rem;
		color: ${theme.colors.text};
	}
`;

export const ActivityBox = styled(FlexBox)`
	justify-content: flex-start;
	gap: 5px;
`;

export const NumberBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 27px;
	height: 28px;
	min-width: 27px;
	min-height: 28px;
	background: ${theme.colors.violet};
	border-radius: 3px;
	color: ${theme.colors.background};
`;

export const Visit_Icon = styled(Link_Icon)`
	@media (max-width: 840px) {
		display: none;
	}
`;

export const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 10px;

	@media (min-width: 840px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;
export const HorizontalDivider = styled.div`
	width: 100%;
	border: 2px dashed ${theme.colors.border};
	margin: 20px 0;
`;

export const AchievementsContainer = styled.div`
	margin-top: 40px;
	background-color: transparent;
	border-radius: 10px;
	padding: 20px;
	color: white;
	display: flex;
	justify-content: space-between;

	@media (max-width: 840px) {
		display: block;
		padding: 0;
	}
	@media (min-width: 840px) {
		background-color: rgba(151, 71, 255, 0.2);
	}
`;

export const AchievementColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: 0 20px;
	position: relative;

	@media (max-width: 840px) {
		padding: 0;
	}
`;

export const Achievement = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: transparent;
	padding: 10px 0;

	@media (max-width: 840px) {
		background-color: rgba(151, 71, 255, 0.2);
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 10px;
	}
`;

export const AchievementLabel = styled(Label)`
	flex: 1;
`;

export const AchievementValue = styled(Value)`
	text-align: right;
	flex-shrink: 0;
`;

export const Divider = styled.div`
	width: 1px;
	background-color: #b3b3b3;
	position: absolute;
	height: 100%;
	right: 0;

	@media (max-width: 840px) {
		display: none;
	}
`;
