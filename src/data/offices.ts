import { OfficeItem } from "@/types/offices";

export const offices: OfficeItem[] = [
  {
    id: 1,
    officeTitle: "Headquarters",
    officeAddress: "123 Main St, Springfield, IL",
    contactInfo: {
      fullName: "John Doe",
      jobPosition: "CEO",
      email: "johndoe@example.com",
      phoneNumber: "(123) 456-7890",
    },
    isExpanded: false,
  },
  {
    id: 2,
    officeTitle: "Branch Office 1",
    officeAddress: "456 Elm St, Springfield, IL",
    contactInfo: {
      fullName: "Jane Smith",
      jobPosition: "Office Manager",
      email: "janesmith@example.com",
      phoneNumber: "(123) 987-6543",
    },
    isExpanded: false,
  },
  {
    id: 3,
    officeTitle: "Branch Office 2",
    officeAddress: "123 Main St, St. Louis, IL",
    contactInfo: {
      fullName: "Kelly Bright",
      jobPosition: "Office Manager",
      email: "kelly.bright@example.com",
      phoneNumber: "(123) 456-7890",
    },
    isExpanded: false,
  },
  {
    id: 4,
    officeTitle: "Branch Office 3",
    officeAddress: "619 S La Salle St, Chicago, IL",
    contactInfo: {
      fullName: "Lisa Criag",
      jobPosition: "Office Manager",
      email: "lisa.criag@example.com",
      phoneNumber: "(123) 987-6543",
    },
    isExpanded: false,
  },
];
