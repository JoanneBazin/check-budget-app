import { ModalProps } from "@/types/budgets";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "@/styles/components/ui/Modal.scss";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />

        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Modifier les informations liées à cette entrée
          </Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button className="dialog-close" aria-label="Fermer">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
