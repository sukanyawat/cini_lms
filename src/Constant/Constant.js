export const USER_ROLE = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  CLINIC: "clinic"
};

export const SPECIALTY_LIST = [
  "Anesthesiology",
  "Allergy and Immunology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Gastroenterology",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Medical Genetics",
  "Nephrology",
  "Neurology",
  "Obstetrics and Gynecology (OB/GYN)",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology (ENT)",
  "Pathology",
  "Pediatrics",
  "Physical Medicine and Rehabilitation",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Surgery",
  "Thoracic Surgery",
  "Urology",
];

export const APPOINTMENT_STATUS_TYPE = {
  COMPLETED: "completed",
  PENDING: "pending",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  DOC_RESCHEDULED: "doctor_rescheduled",
};

export const APPOINTMENT_BOOKING_TYPE = {
  DOCTOR: "doctor",
  CLINIC: "clinic"
};

export const consultationDays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export const consultationDurations = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "120", label: "2 hours" },
];

export const consultationGaps = [
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes" },
];

export const COMMON_SITE_CONFIG = {
  DEFAULT_APP_IMG: "/assets/appDefault.png",
  DEFAULT_DOCTOR_IMG: "/assets/doctorImage.png"
};
