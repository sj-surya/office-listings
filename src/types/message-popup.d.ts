export interface MessagePopupProps {
  message: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "left-center"
    | "right-center"
    | "center";
  autoDismiss?: boolean;
  dismissTime?: number; // in milliseconds
  onClose?: () => void;
}
