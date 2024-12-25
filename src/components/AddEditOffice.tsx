import { OfficeItem } from "@/types/offices";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  title: string;
  address: string;
  fullName: string;
  jobPosition: string;
  email: string;
  phone: string;
}

interface AddEditOfficeProps {
  office?: OfficeItem;
  editingOffice?: { id: number } | null;
  onSave: (office: OfficeItem) => void;
  onCancel: () => void;
}

const AddEditOffice: React.FC<AddEditOfficeProps> = ({
  office,
  editingOffice,
  onSave,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      title: office?.officeTitle,
      address: office?.officeAddress,
      fullName: office?.contactInfo?.fullName,
      jobPosition: office?.contactInfo?.jobPosition,
      email: office?.contactInfo?.email,
      phone: office?.contactInfo?.phoneNumber,
    },
  });

  const [phone, setPhone] = useState(office?.contactInfo.phoneNumber || "");

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D+/g, ""); // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    const [, areaCode, prefix, lineNumber] = match;

    if (lineNumber) return `(${areaCode}) ${prefix}-${lineNumber}`;
    if (prefix) return `(${areaCode}) ${prefix}`;
    if (areaCode) return `(${areaCode}`;
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone); // Update local state
    setValue("phone", formattedPhone); // Update react-hook-form value
  };

  const onFormCancel = () => {
    reset();
    onCancel();
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { title, address, fullName, jobPosition, email, phone } = data;

    const newOfficeData: OfficeItem = {
      isExpanded: office?.isExpanded || false,
      id: office?.id || -1,
      officeTitle: title,
      officeAddress: address,
      contactInfo: {
        fullName,
        jobPosition,
        email,
        phoneNumber: phone,
      },
    };
    onSave(newOfficeData);
  };

  return (
    <div className="w-full p-6 border shadow-md rounded-lg">
      <div className="flex justify-between justify-items-center mb-4">
        <h1 className="text-2xl font-bold">
          {editingOffice ? "Edit" : "New"} Location
        </h1>
        <Image
          src="/images/cross-grey.svg"
          alt="X"
          height={28}
          width={28}
          className="cursor-pointer"
          onClick={onFormCancel}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter the address *
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <h2 className="text-md text-sky-600">Contact Information</h2>

        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Job Position Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Position *
          </label>
          <input
            type="text"
            {...register("jobPosition", {
              required: "Job Position is required",
            })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.jobPosition ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.jobPosition && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jobPosition.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="name@example.com"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone *
          </label>
          <input
            type="tel"
            value={phone}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\(\d{3}\) \d{3}-\d{4}$/,
                message: "Phone number must match (XXX) XXX-XXXX format",
              },
            })}
            onInput={handlePhoneChange}
            placeholder="(XXX) XXX-XXXX"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none sm:text-sm ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-between gap-7">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onFormCancel}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditOffice;
