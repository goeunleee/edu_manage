import styled from "styled-components";

const theme = {
	colors: {
		text: "#000000",
		border: "#e6e9ec",
		background: "#ffffff",
		highlight: "rgba(151, 71, 255, 0.2)",
		divider: "#b3b3b3",
	},
	fontSize: {
		desktop: "1.125rem", // 18px
		mobile: "1rem", // 16px
	},
	borderRadius: "10px",
	padding: "20px",
	gap: "40px",
};

const Container = styled.div`
	padding: ${theme.padding};
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: ${theme.gap};
	margin: 40px 0;

	@media (max-width: 840px) {
		grid-template-columns: 1fr;
	}
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	padding: 10px 0;
`;

const Label = styled.span`
	font-weight: bold;
	font-size: ${theme.fontSize.desktop};
	color: ${theme.colors.text};

	@media (max-width: 840px) {
		font-size: ${theme.fontSize.mobile};
	}
`;

const Value = styled.span`
	font-size: ${theme.fontSize.desktop};
	color: ${theme.colors.text};

	@media (max-width: 840px) {
		font-size: ${theme.fontSize.mobile};
	}
`;

const AchievementsContainer = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: space-between;

	@media (max-width: 840px) {
		display: block;
	}

	@media (min-width: 840px) {
		background-color: ${theme.colors.highlight};
		border-radius: ${theme.borderRadius};
		padding: 10px 40px;
	}
`;

const AchievementColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 20px;
	position: relative;

	@media (max-width: 840px) {
		padding: 0;
	}
`;

const Achievement = styled(FlexBox)`
	@media (max-width: 840px) {
		border: 1px solid ${theme.colors.border};
		background-color: ${theme.colors.highlight};
		border-radius: ${theme.borderRadius};
		padding: 20px;
		margin-bottom: 10px;
	}
`;

const VerticalDivider = styled.div`
	width: 1px;
	background-color: ${theme.colors.divider};
	position: absolute;
	height: 100%;
	right: 0;

	@media (max-width: 840px) {
		display: none;
	}
`;

const HorizontalDashDivider = styled.div`
	width: 100%;
	border: 2px dashed ${theme.colors.border};
`;

const ActivityContainer = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: fit-content;
	margin: 10px 0;
	background: ${theme.colors.background};
	border: 1px solid ${theme.colors.border};
	border-radius: ${theme.borderRadius};
	padding: 40px;
`;

// Label 데이터
const fieldLabels = ["Title", "Counselor", "Received Date"];
const achievementLabels = ["✍️ Writing Competition", "🏆 Competition", "🏫 Pre-College", "💼 Internship", "⛑️ Volunteer", "🔎 Research"];

// Value 데이터
const fieldValues = ["EC report", "Alice", "Aug 23, 2024"];
const achievementValues = ["-", "2", "-", "-", "-", "-"];

export default function StudentPage() {
	return (
		<Container>
			<GridContainer>
				{fieldLabels.map((label, index) => (
					<FlexBox key={index}>
						<Label>{label}</Label>
						<Value>{fieldValues[index]}</Value>
					</FlexBox>
				))}
			</GridContainer>

			<Label>Total : {achievementLabels.length}</Label>
			<AchievementsContainer>
				{[0, 2, 4].map((startIndex) => (
					<AchievementColumn key={startIndex}>
						<Achievement>
							<Label>{achievementLabels[startIndex]}</Label>
							<Value>{achievementValues[startIndex]}</Value>
						</Achievement>
						<Achievement>
							<Label>{achievementLabels[startIndex + 1]}</Label>
							<Value>{achievementValues[startIndex + 1]}</Value>
						</Achievement>
						{startIndex !== 4 && <VerticalDivider />}
					</AchievementColumn>
				))}
			</AchievementsContainer>

			<ActivityContainer>
				<HorizontalDashDivider />
			</ActivityContainer>
		</Container>
	);
}
