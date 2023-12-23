import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateStepTwoData } from '@/store/formSlice';
import ProgressIndicator from '../UI/progressIndicator';
import Button from '../UI/button';
import CardForm from '../UI/cardForm';
import deleteIcon from '@/assets/Interface/delete.svg';
import styles from './stepTwo.module.scss';

interface IFormInputOneStep {
  advantages: Array<{ id: string; value: string }>;
  checkboxName1: boolean;
  checkboxName2: boolean;
  checkboxName3: boolean;
  radioGroupName: string;
}
function StepTwo() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formSlice.stepTwoData);
  const navigate = useNavigate();
  const { register, control, handleSubmit, getValues, reset } = useForm<IFormInputOneStep>({
    defaultValues: {
      advantages: [
        { id: '', value: '' },
        { id: '', value: '' },
        { id: '', value: '' },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'advantages',
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = (data: {
    advantages: Array<{ id: string; value: string }>;
    checkboxName1: boolean;
    checkboxName2: boolean;
    checkboxName3: boolean;
    radioGroupName: string;
  }) => {
    console.log(data);
    navigate('/step-three');
    dispatch(updateStepTwoData(data));
  };

  const onButtonBack = () => {
    navigate('/step-one');
  };

  const checkedCheckboxes = () => {
    return (
      getValues('checkboxName1') ||
      getValues('checkboxName2') ||
      getValues('checkboxName3') ||
      new Error('Выберите хотя бы один чекбокс')
    );
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <CardForm>
      <ProgressIndicator />
      <form className={styles.formStepOne} onSubmit={handleSubmit(onSubmit, onError)}>
        {fields.map((field, index) => (
          <div className={styles.inputGroup} key={field.id}>
            <input
              {...register(`advantages.${index}.value`, { required: true })}
              defaultValue={field.value}
              className={styles.inputStepTwo}
              placeholder={`Advantage №${index + 1}`}
              id={`advantages-${index}`}
            />
            <a
              id={`button-remove-${index}`}
              className={styles.deleteIcon}
              type="button"
              onClick={() => remove(index)}>
              <img src={deleteIcon} alt="delete" />
            </a>
          </div>
        ))}
        <button
          className={styles.buttonIncrement}
          type="button"
          onClick={() => append({ id: '', value: '' })}>
          +
        </button>
        <div className={styles.checkboxGroup}>
          <div>Checkbox group</div>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkboxInput}
              id="checkbox-group-option-1"
              type="checkbox"
              value={1}
              {...register('checkboxName1')}
            />
            <label htmlFor="checkbox-group-option-1" className={styles.checkboxLabel}>
              1
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkboxInput}
              id="checkbox-group-option-2"
              type="checkbox"
              {...register('checkboxName2')}
            />
            <label htmlFor="checkbox-group-option-2" className={styles.checkboxLabel}>
              2
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkboxInput}
              id="checkbox-group-option-3"
              type="checkbox"
              {...register('checkboxName3')}
            />
            <label htmlFor="checkbox-group-option-3" className={styles.checkboxLabel}>
              3
            </label>
          </div>
        </div>

        <div className={styles.radioGroup}>
          <div>Radio group</div>
          <div className={styles.radioContainer}>
            <input
              id="radio-group-option-1"
              type="radio"
              value="Option1"
              {...register('radioGroupName', { required: true })}
              name="radioGroupName"
            />
            <label htmlFor="radio-group-option-1" className={styles.radioLabel}>
              1
            </label>
          </div>
          <div className={styles.radioContainer}>
            <input
              id="radio-group-option-2"
              type="radio"
              value="Option2"
              {...register('radioGroupName', { required: true })}
              name="radioGroupName"
            />
            <label htmlFor="radio-group-option-2" className={styles.radioLabel}>
              2
            </label>
          </div>
          <div className={styles.radioContainer}>
            <input
              id="radio-group-option-3"
              type="radio"
              value="Option3"
              {...register('radioGroupName', { required: true })}
              name="radioGroupName"
            />
            <label htmlFor="radio-group-option-3" className={styles.radioLabel}>
              3
            </label>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="Back" id="button-back" onClick={onButtonBack}>
            Назад
          </Button>
          <Button variant="Start" id="button-next" type="submit" onClick={checkedCheckboxes}>
            Далее
          </Button>
        </div>
      </form>
    </CardForm>
  );
}

export default StepTwo;
