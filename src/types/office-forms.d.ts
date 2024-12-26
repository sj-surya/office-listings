export interface OfficeFormInputs {
  title: string;
  address: string;
  fullName: string;
  jobPosition: string;
  email: string;
  phone: string;
}

export interface AddEditOfficeProps {
  office?: OfficeItem;
  editingOffice?: { id: number } | null;
  onSave: (office: OfficeItem) => void;
  onCancel: () => void;
}
