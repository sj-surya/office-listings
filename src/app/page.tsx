"use client";
import { useState } from "react";
import Image from "next/image";
import { offices as initialOffices } from "@/data/offices";
import { AddEditOffice, MessagePopup, OfficeCard } from "@/components";
import { OfficeItem } from "@/types";

const Home = () => {
  const [offices, setOffices] = useState(initialOffices);
  const [editingOffice, setEditingOffice] = useState<null | { id: number }>(
    null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [action, setAction] = useState("added");

  const toggleOpen = (itemId: number) => {
    setOffices((prev) =>
      prev.map((office) => {
        const { id, isExpanded } = office;
        return id === itemId ? { ...office, isExpanded: !isExpanded } : office;
      })
    );
  };

  const deleteOffice = (itemId: number) => {
    setOffices((prev) =>
      prev
        .filter((office) => office.id !== itemId)
        .map((office, idx) => {
          return { ...office, id: idx + 1 };
        })
    );
    setAction("deleted");
    setIsMessageVisible(true);
  };

  const handleSave = (updatedData: OfficeItem) => {
    const { id } = updatedData;

    if (id !== -1) {
      setOffices((prev) =>
        prev.map((office) => (office.id === id ? updatedData : office))
      );
      setEditingOffice(null);
      setAction("edited");
    } else {
      setOffices((prev) => [
        ...prev.map((office, idx) => {
          return { ...office, id: idx + 1 };
        }),
        {
          ...updatedData,
          id: prev.length + 1,
        },
      ]);
      setAction("added");
      setIsAdding(false);
    }
    setIsMessageVisible(true);
  };

  const officeFormCancel = () => {
    setIsAdding(false);
    setEditingOffice(null);
  };

  const onEditHandler = (officeId: number) => {
    setEditingOffice({
      id: officeId,
    });
  };

  return (
    <div className="min-w-96 w-96 mx-auto p-4 grid">
      {isMessageVisible && (
        <MessagePopup
          message={`Office location ${action} successfully!`}
          onClose={() => {
            setIsMessageVisible(false);
          }}
        />
      )}
      <h1 className="text-6xl text-center mb-8 text-cyan-600">Offices</h1>
      <div className="w-full grid gap-4">
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
            isAdding ? "max-h-fit py-4" : "py-0"
          }`}
        >
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full bg-cyan-500 text-white text-lg font-semibold flex justify-items-center justify-between px-4 py-3 rounded-md"
            >
              Add New Location
              <Image
                src="/images/add-white.svg"
                alt="Add"
                width={25}
                height={25}
              />
            </button>
          ) : (
            <AddEditOffice onSave={handleSave} onCancel={officeFormCancel} />
          )}
        </div>

        {offices.map((office) => {
          const { id } = office;
          return (
            <OfficeCard
              key={id}
              editingOffice={editingOffice}
              officeData={office}
              onToggleExpand={toggleOpen}
              onEditHandler={onEditHandler}
              handleSave={handleSave}
              onDelete={deleteOffice}
              onOfficeFormCancel={officeFormCancel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
