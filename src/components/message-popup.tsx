import React, { useEffect, useState } from "react";
import { MessagePopupProps } from "@/types";

const MessagePopup: React.FC<MessagePopupProps> = ({
  message,
  position = "top-right",
  autoDismiss = true,
  dismissTime = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (autoDismiss) {
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, dismissTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, dismissTime, onClose]);

  if (!visible) return null;

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "left-center": "top-1/2 left-4 transform -translate-y-1/2",
    "right-center": "top-1/2 right-4 transform -translate-y-1/2",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`fixed z-50 p-4 bg-blue-600 text-white rounded shadow-lg ${positionClasses[position]} transition-opacity duration-300`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-4 text-sm font-bold hover:text-gray-300 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
