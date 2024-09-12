export interface EcReportItem {
	id: string;
	ec_db: EcDb;
	is_added: boolean;
}
export interface Student {
	name: string;
	email: string;
	profile: Profile;
}
export interface Counselor {
	name: string;
	email: string;
}

export interface ReportData {
	id: string;
	student: Student;
	counselor: Counselor;
	title: string;
	ec_report_status: string;
	send_dt: string;
	delivered_dt: string;
	ec_report_items: EcReportItem[];
}

export interface Profile {
	id: string;
	school_id: string;
	gender: string;
	birth_day: string;
	grade: string;
	year_admission: string;
	nationality: string[];
	status_type: string;
	created_at: string;
	updated_at: string;
	school: School;
}

export interface School {
	country_id: string;
	id: string;
	name: string;
	address: string;
	url: string;
	created_at: string;
	updated_at: string;
}

export interface EcDb {
	year: string;
	id: string;
	name: string;
	organization: string;
	ec_type: string;
	recognition_level: string;
	nationality: string;
	url: string;
	participate_way: string[];
	age_limit: string[];
	grade_limit: string[];
}
