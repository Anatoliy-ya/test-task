import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateStepOneData } from '@/store/formSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ProgressIndicator from '../UI/progressIndicator';
import CardForm from '../UI/cardForm';
import Button from '../UI/button';
import styles from './stepOne.module.scss';

interface IFormInputOneStep {
  nickname: string;
  name: string;
  sername: string;
  sex: string;
}
function StepOne() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formSlice.stepOneData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputOneStep>();

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = (data: { nickname: string; name: string; sername: string; sex: string }) => {
    console.log(data);
    navigate('/step-two');
    dispatch(updateStepOneData(data));
  };

  const onButtonBack = () => {
    navigate('/');
  };
  const onError = (errors: any, e: any) => console.log(errors, e);
  return (
    <CardForm>
      <ProgressIndicator />
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formStepOne}>
        <div className={styles.inputGroup}>
          <label htmlFor="field-nickname">Никнейм</label>
          <input
            className={styles.inputStepOne}
            id="field-nickname"
            placeholder="Ваш никнейм"
            {...register('nickname', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Неверный формат никнейма',
              },
            })}
          />
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="field-name">Имя</label>
          <input
            className={styles.inputStepOne}
            placeholder="Ваше имя"
            id="field-name"
            {...register('name', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Неверный формат имени',
              },
            })}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="field-sername">Фамилия</label>
          <input
            className={styles.inputStepOne}
            placeholder="Ваша фамилия"
            id="field-sername"
            {...register('sername', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Неверный формат фимилии',
              },
            })}
          />
          {errors.sername && <p className={styles.errorMessage}>{errors.sername.message}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="field-sex">Пол</label>
          <select
            className={styles.selectStepOne}
            id="field-sex"
            {...register('sex', { required: 'Это поле обязательно для заполнения' })}>
            <option value="">Не выбрано</option>
            <option id="field-sex-option-man" value="Мужской">
              Мужской
            </option>
            <option id="field-sex-option-woman" value="Женский">
              Женский
            </option>
          </select>
          {errors.sex && <p className={styles.errorMessage}>{errors.sex.message}</p>}
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="Back" id="button-back" onClick={onButtonBack}>
            Назад
          </Button>
          <Button variant="Start" id="button-next" type="submit">
            Далее
          </Button>
        </div>
      </form>
    </CardForm>
  );
}

export default StepOne;
