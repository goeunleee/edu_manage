"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { getStudentData } from "../api/api";
import { ReportData } from "../type/commonApi";

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
	padding: 30px 50px;

	@media (max-width: 840px) {
		padding: 20px;

		.title {
			font-size: 1.125rem; /* 18px */
		}
	}

	.title {
		display: flex;
		font-size: 1.25rem; /* 20px */
		font-weight: bold;
		gap: 10px;
	}
`;
const NumberBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2px 7px;
	gap: 10px;

	width: 27px;
	height: 28px;
	background: #7a40f2;
	border-radius: 3px;
	color: #ffffff;
`;

export default function StudentPage() {
	const [data, setData] = useState<ReportData | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getStudentData();
				console.log(result);
				setData(result.data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>data load...</div>;
	}

	if (error) {
		console.log(error);
		return <div>데이터를 가져올 수 없습니다</div>;
	}

	const fieldLabels = ["Title", "Counselor", "Received Date"];
	const fieldValues = [data?.title || "-", data?.counselor?.name || "-", data?.send_dt.slice(0, 10) || "-"];
	const achievementLabels = ["✍️ Writing Competition", "🏆 Competition", "🏫 Pre-College", "💼 Internship", "⛑️ Volunteer", "🔎 Research"];
	const achievementValues = ["-", "-", "-", "-", "-", "-"];

	const activity =
		data?.ec_report_items.map((item) => ({
			programName: item.ec_db.name,
			organization: item.ec_db.organization,
			type: item.ec_db.ec_type,
			participationWay: item.ec_db.participate_way.join(", "),
			recognitionLevel: item.ec_db.recognition_level,
			nationality: item.ec_db.nationality,
			gradeLimit: item.ec_db.grade_limit.join(", "),
			ageLimit: item.ec_db.age_limit.join(", "),
		})) ?? [];

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

			<Label>Total: {achievementLabels.length}</Label>
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

			{activity.length > 0 ? (
				activity.map((item, index) => (
					<ActivityContainer key={index}>
						<span className="title">
							<NumberBox>{index + 1} </NumberBox>
							{item.programName}
						</span>
						<p>{item.organization}</p>
						<HorizontalDashDivider />
						<p>타입: {item.type}</p>
						<p>참여방식: {item.participationWay}</p>
						<p>인정 수준: {item.recognitionLevel}</p>
						<p>국적: {item.nationality}</p>
						<p>학년: {item.gradeLimit}</p>
						<p>나이: {item.ageLimit}</p>
					</ActivityContainer>
				))
			) : (
				<p>데이터가 없습니다.</p>
			)}
		</Container>
	);
}
