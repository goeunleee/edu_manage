"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { getStudentData } from "../api/api";
import { ReportData } from "../type/commonApi";
import Link_Icon from "../icons/link.svg";
import Check_Icon from "../icons/check.svg";
import Filter_Icon from "../icons/filter.svg";

const theme = {
	colors: {
		text: "#000",
		border: "#e6e9ec",
		background: "#fff",
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
	padding: 10px 0;
`;

const Check = styled(Check_Icon)`
	@media (min-width: 840px) {
		display: none;
	}
`;
const Filter = styled(Filter_Icon)`
	@media (min-width: 840px) {
		display: none;
	}
`;
type BtnTheme = "dark" | "primary" | "primary_active";

interface ButtonProps {
	btnTheme: BtnTheme;
}
const Button = styled.button<ButtonProps>`
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

const PrimaryPCButton = styled(Button)`
	@media (min-width: 840px) {
		display: block;
	}
	@media (max-width: 840px) {
		display: none;
	}
`;
const PrimaryMobileButton = styled(Button)`
	@media (min-width: 840px) {
		display: none;
	}
	@media (max-width: 840px) {
		display: block;
	}
`;
const DarkMobileButton = styled(Button)`
	@media (min-width: 840px) {
		display: none;
	}
	@media (max-width: 840px) {
		display: block;
	}
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
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	@media (max-width: 840px) {
		display: block;
	}
	@media (min-width: 840px) {
		background-color: ${theme.colors.highlight};
		border-radius: ${theme.borderRadius};
		padding: 10px 40px;
	}
`;

const ActivityContainer = styled.div`
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

const ActivityBox = styled(FlexBox)`
	justify-content: flex-start;
	gap: 5px;
`;

const NumberBox = styled.div`
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

const Visit_Icon = styled(Link_Icon)`
	@media (max-width: 840px) {
		display: none;
	}
`;

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 10px;

	@media (min-width: 840px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;
const HorizontalDivider = styled.div`
	width: 100%;
	border: 2px dashed ${theme.colors.border};
	margin: 20px 0;
`;
export default function StudentPage() {
	const [data, setData] = useState<ReportData | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getStudentData();
				setData(result.data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) return <div>data load...</div>;
	if (error) return <div>데이터를 가져올 수 없습니다</div>;

	const fieldLabels = ["Title", "Counselor", "Received Date"];
	const fieldValues = [data?.title || "-", data?.counselor?.name || "-", data?.send_dt.slice(0, 10) || "-"];

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

			{activity.length > 0 ? (
				activity.map((item, index) => (
					<ActivityContainer key={index}>
						<span className="title">
							<NumberBox>{index + 1}</NumberBox>
							{item.programName}
							<Visit_Icon />
							<PrimaryPCButton btnTheme="primary" style={{ marginLeft: "auto" }}>
								add to EC list
							</PrimaryPCButton>
						</span>
						<p>{item.organization}</p>
						<HorizontalDivider />
						<GridWrapper>
							<ActivityBox>
								<Filter_Icon />
								<p className="label">Type:</p>
								<p className="value">{item.type}</p>
							</ActivityBox>
							<ActivityBox>
								<Filter />
								<p className="label">Participation:</p>
								<p className="value">{item.participationWay}</p>
							</ActivityBox>
							<ActivityBox>
								<Filter />
								<p className="label">Recognition:</p>
								<p className="value">{item.recognitionLevel}</p>
							</ActivityBox>
							<ActivityBox>
								<Check_Icon />
								<p className="label">Nationality:</p>
								<p className="value">{item.nationality}</p>
							</ActivityBox>
							<ActivityBox>
								<Check />
								<p className="label">Grade:</p>
								<p className="value">{item.gradeLimit}</p>
							</ActivityBox>
							<ActivityBox>
								<Check />
								<p className="label">Age:</p>
								<p className="value">{item.ageLimit}</p>
							</ActivityBox>
						</GridWrapper>
						<ActivityBox>
							<PrimaryMobileButton btnTheme="primary">add to EC list</PrimaryMobileButton>
							<DarkMobileButton btnTheme="dark">Visit Website</DarkMobileButton>
						</ActivityBox>
					</ActivityContainer>
				))
			) : (
				<p>데이터가 없습니다.</p>
			)}
		</Container>
	);
}
