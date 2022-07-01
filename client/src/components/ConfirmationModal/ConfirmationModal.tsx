import { ReactElement } from "react";

import "./ConfirmationModal.scss";

export interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps): ReactElement => (
  <>
    <div className="confirmation-modal-background-overlay" />
    <div className="confirmation-modal-container">
      <span className="confirmation-modal-message">{message}</span>
      <div className="confirmation-modal-buttons-container">
        <button
          className="confirmation-modal-confirm-button"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button className="confirmation-modal-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </>
);
export default ConfirmationModal;
