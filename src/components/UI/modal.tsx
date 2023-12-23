import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { modalStateChange } from '@/store/formSlice';
import Button from './button';
import errorForModalIcon from '@/assets/Interface/error_modal.svg';
import applyForModalIcon from '@/assets/Interface/apply_modal.svg';
import styles from './modal.module.scss';

interface Props {
  isErrorModal: boolean | null;
  handleCloseModal: () => void;
}
function Modal({ isErrorModal, handleCloseModal }: Props) {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.formSlice.active);
  const classModal = `${styles.modal} ${isActive ? styles.active : ''}`;

  const onClose = () => {
    if (!isErrorModal) {
      handleCloseModal();
    }

    dispatch(modalStateChange());
  };

  return (
    <div className={classModal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={isErrorModal ? styles.modalTitleError : styles.modalTitle}>
          {isErrorModal ? 'Ошибка' : 'Форма успешно отправлена'}
        </p>
        <img src={isErrorModal ? errorForModalIcon : applyForModalIcon} alt="Modal image" />
        <div className={isErrorModal ? styles.modalButtonError : styles.modalButton}>
          <Button
            id={isErrorModal ? 'button-close' : 'button-to-main'}
            variant="Start"
            type="button"
            onClick={onClose}>
            {isErrorModal ? 'Закрыть' : 'На главную'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
