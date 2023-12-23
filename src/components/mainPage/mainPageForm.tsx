import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateMainForm } from '@/store/formSlice';
import Button from '../UI/button';
import styles from './mainPageForm.module.scss';

interface IFormInput {
  phoneNumber: string;
  email: string;
}

function MainPageForm() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formSlice.mainForm);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = (data: { phoneNumber: string; email: string }) => {
    console.log(data);
    navigate('/step-one');
    dispatch(updateMainForm(data));
  };
  const onError = (errors: any, e: any) => console.log(errors, e);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formMainPage}>
      <div className={styles.inputGroup}>
        <label htmlFor="phoneNumber">Номер телефона</label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue="" // Устанавливаемое по умолчанию значение
          render={({ field: { ref, ...field } }) => (
            <ReactInputMask
              {...field}
              mask="+7 (999) 999-99-99"
              className={styles.inputMainPage}
              id="phoneNumber"
              placeholder="+7 (900) 000-00-00"
            />
          )}
        />
        {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.inputMainPage}
          placeholder="webstudio.fractal@example.com"
          id="email"
          type="email"
          {...register('email', {
            required: 'Это поле обязательно для заполнения',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Неверный формат email',
            },
          })}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>
      <div className={styles.button}>
        <Button type="submit" id="button-start" variant="Start">
          Начать
        </Button>
      </div>
    </form>
  );
}

export default MainPageForm;
