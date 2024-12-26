import { useMemo } from "react";
import Image from "next/image";
import AddEditOffice from "./add-edit-office";
import { OfficeCardProps } from "@/types";

const OfficeCard: React.FC<OfficeCardProps> = ({
  officeData,
  editingOffice,
  onToggleExpand,
  onEditHandler,
  handleSave,
  onDelete,
  onOfficeFormCancel,
}) => {
  const { id, isExpanded, officeTitle, officeAddress } = officeData;
  const { fullName, jobPosition, email, phoneNumber } = useMemo(() => {
    return officeData.contactInfo;
  }, [officeData.contactInfo]);
  return (
    <div className="border rounded-lg shadow-md">
      {editingOffice?.id === id ? (
        <AddEditOffice
          onSave={handleSave}
          office={officeData}
          editingOffice={editingOffice}
          onCancel={onOfficeFormCancel}
        />
      ) : (
        <div>
          <div
            className={`${
              isExpanded ? "bg-gray-300" : "bg-white"
            } px-4 py-7 rounded-t-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{officeTitle}</h2>
                <p className="text-gray-600">{officeAddress}</p>
              </div>
              <button
                onClick={() => onToggleExpand(id)}
                className={`transition-transform ease-in-out duration-200 p-2 rounded rotate-${
                  isExpanded ? "0" : "180"
                }`}
              >
                <Image
                  src="/images/up-arrow.svg"
                  alt="^"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[500px] py-4" : "max-h-0 py-0"
            } p-4`}
          >
            <div className={`opacity-${isExpanded ? "100" : "0"}`}>
              <div className="flex flex-col gap-1">
                <p className="font-semibold subpixel-antialiased text-base">
                  {fullName}
                </p>
                <p className="text-gray-600">{jobPosition}</p>
                <p className="text-sky-500">{email}</p>
                <p>{phoneNumber}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="w-26 flex justify-items-center gap-3 text-gray-500 text-md px-4 py-2 rounded transition ease-in-out hover:-translate-y-1 duration-200"
                  onClick={() => onEditHandler(id)}
                >
                  <Image
                    src="/images/edit-pencil.svg"
                    alt="Edit"
                    width={23}
                    height={23}
                  />
                  Edit
                </button>
                <button
                  className="w-26 flex justify-items-center gap-3 text-red-500 text-md px-4 py-2 rounded transition ease-in-out hover:-translate-y-1 duration-200"
                  onClick={() => onDelete(id)}
                >
                  <Image
                    src="/images/delete.svg"
                    alt="X"
                    width={20}
                    height={20}
                  />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeCard;
