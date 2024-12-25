export interface ContactInfo {
  fullName: string;
  jobPosition: string;
  email: string;
  phoneNumber: string;
}

export interface OfficeItem {
  id: number;
  officeTitle: string;
  officeAddress: string;
  contactInfo: ContactInfo;
  isExpanded: boolean;
}
