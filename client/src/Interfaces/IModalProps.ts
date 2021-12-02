import { PropsWithChildren } from "react";

export interface IModalProps extends PropsWithChildren<{}> {
  title: string;
  isVisible: boolean;
  onSubmit?: () => void;
  submitButtonText?: string;
  onCancel: () => void;
}
