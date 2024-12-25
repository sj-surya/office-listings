import { OfficeItem } from "./offices";

export interface OfficeCardProps {
  officeData: OfficeItem;
  editingOffice: { id: number } | null;
  onToggleExpand: (itemId: number) => void;
  onEditHandler: (officeId: number) => void;
  handleSave: (updatedData: OfficeItem) => void;
  onDelete: (itemId: number) => void;
  onOfficeFormCancel: () => void;
}
