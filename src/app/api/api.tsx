import axios from "axios";

export const getStudentData = async () => {
	try {
		const res = await axios.get("https://edu.eclab.me/api/test");
		return res.data;
	} catch (error) {
		console.error("데이터를 가져올 수 없습니다:", error);
		return null;
	}
};

export const getCounselorData = async () => {
	try {
		const res = await axios.get("https://edu.eclab.me/api/test");
		return res.data;
	} catch (error) {
		console.error("데이터를 가져올 수 없습니다:", error);
		return null;
	}
};
