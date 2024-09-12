"use client";

import { useState, useEffect } from "react";
import { getStudentData } from "../api/api";
import { ReportData } from "../type/commonApi";
import Check_Icon from "../icons/check.svg";
import Filter_Icon from "../icons/filter.svg";
import {
	Container,
	GridContainer,
	FlexBox,
	Label,
	Value,
	ActivityContainer,
	NumberBox,
	Visit_Icon,
	PrimaryPCButton,
	HorizontalDivider,
	GridWrapper,
	ActivityBox,
	Filter,
	Check,
	PrimaryMobileButton,
	DarkMobileButton,
	Achievement,
	AchievementColumn,
	AchievementLabel,
	AchievementsContainer,
	Divider,
	AchievementValue,
} from "../component/common/pageCommon";
import { styled } from "styled-components";

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
			<Label>Total : 2</Label>
			<AchievementsContainer>
				<AchievementColumn>
					<Achievement>
						<AchievementLabel>✍️ Writing Competition</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
					<Achievement>
						<AchievementLabel>🏆 Competition</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
					<Divider />
				</AchievementColumn>

				<AchievementColumn>
					<Achievement>
						<AchievementLabel>🏫 Pre-College</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
					<Achievement>
						<AchievementLabel>💼 Internship</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
					<Divider />
				</AchievementColumn>

				<AchievementColumn>
					<Achievement>
						<AchievementLabel>⛑️ Volunteer</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
					<Achievement>
						<AchievementLabel>🔎 Research</AchievementLabel>
						<AchievementValue>-</AchievementValue>
					</Achievement>
				</AchievementColumn>
			</AchievementsContainer>
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
