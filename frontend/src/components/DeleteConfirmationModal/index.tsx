import * as Dialog from '@radix-ui/react-dialog';
import { ButtonContainer, CancelButton, CloseButton, Content, DeleteButton, Overlay } from './styles';
import { X } from 'phosphor-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirmDelete }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <ButtonContainer>
          <DeleteButton onClick={onConfirmDelete}>Yes, delete</DeleteButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonContainer>
      </Content>
    </Dialog.Portal>
  );
}
