import { ReactElement } from "react";

import "./ConfirmationModal.scss";

export interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = (
  confirmation: ConfirmationModalProps
): ReactElement => (
  <>
    <div className="confirmation-modal-background-overlay" />
    <div className="confirmation-modal-container">
      <span className="confirmation-modal-message">{confirmation.message}</span>
      <div className="confirmation-modal-buttons-container">
        <button
          className="confirmation-modal-confirm-button"
          onClick={confirmation.onConfirm}
        >
          Confirm
        </button>
        <button
          className="confirmation-modal-cancel-button"
          onClick={confirmation.onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </>
);
export default ConfirmationModal;
