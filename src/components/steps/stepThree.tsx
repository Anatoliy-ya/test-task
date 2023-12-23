import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateStepThreeData, modalStateChange, resetForm } from '@/store/formSlice';
import { submitFormData } from '@/api/formApi';
import { IDataForApi } from '@/types/formTypes';
import ProgressIndicator from '../UI/progressIndicator';
import CardForm from '../UI/cardForm';
import Button from '../UI/button';
import Modal from '../UI/modal';
import styles from './stepThree.module.scss';

interface IFormInputThreeStep {
  about: string;
}
function StepThree() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formSlice.stepThreeData);
  const mainFormData = useAppSelector((state) => state.formSlice.mainForm);
  const stepOneData = useAppSelector((state) => state.formSlice.stepOneData);
  const stepTwoData = useAppSelector((state) => state.formSlice.stepTwoData);
  const [aboutText, setAboutText] = useState('');
  const navigate = useNavigate();
  const [isErrorModal, setIsErrorModal] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputThreeStep>();

  const collectionForm: IDataForApi = {
    ...mainFormData,
    ...stepOneData,
    ...stepTwoData,
    about: aboutText,
  };
  console.log('@', collectionForm);

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleAboutTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(event.target.value);
  };
  const charCountWithoutSpaces = aboutText.replace(/\s/g, '').length;

  const onButtonBack = () => {
    navigate('/step-two');
  };

  const onSubmit = async (data: IFormInputThreeStep) => {
    console.log(data);
    dispatch(updateStepThreeData(data));

    try {
      await submitFormData(collectionForm);
      console.log('@', 'apply');
      setIsErrorModal(false);
      dispatch(modalStateChange());
    } catch (error) {
      setIsErrorModal(true);
      dispatch(modalStateChange());
    }
  };

  const onError = (errors: any) => {
    console.log('@', 'error', errors);
    setIsErrorModal(true);
    dispatch(modalStateChange());
  };
  const handleCloseModal = () => {
    if (!isErrorModal) {
      dispatch(resetForm());
      setAboutText('');
      reset();
      navigate('/');
    }
  };
  return (
    <>
      <Modal isErrorModal={isErrorModal} handleCloseModal={handleCloseModal} />
      <CardForm>
        <ProgressIndicator />
        <form className={styles.formAbout} onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.inputGroup}>
            <label htmlFor="field-about">О себе</label>
            <textarea
              {...register('about', {
                required: 'Это поле обязательно для заполнения',
              })}
              value={aboutText}
              onChange={handleAboutTextChange}
              maxLength={200}
              className={styles.textareaAbout}
              id="field-about"
              placeholder="Напишите что-нибудь о себе"
              name="about"
            />
            <div className={styles.errorMessage}>
              {errors.about && <p>{errors.about.message}</p>}
              <div className={styles.textCount}>{charCountWithoutSpaces}/200</div>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="Back" id="button-back" onClick={onButtonBack}>
              Назад
            </Button>
            <Button variant="Start" id="button-next" type="submit">
              Отправить
            </Button>
          </div>
        </form>
      </CardForm>
    </>
  );
}

export default StepThree;
