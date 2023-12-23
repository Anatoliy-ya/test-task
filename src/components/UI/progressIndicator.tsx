import { useLocation } from 'react-router-dom';
import styles from './progressIndicator.module.scss';

// Определение интерфейса для пропсов

const ProgressIndicator = () => {
  const location = useLocation();
  const currentStep = location.pathname;
  console.log(currentStep);
  console.log(location);

  const progressStep = (currentStep: string) => {
    switch (currentStep) {
      case '/step-one':
        return '0%';
      case '/step-two':
        return '50%';
      case '/step-three':
        return '100%';
      default:
        return '0%';
    }
  };

  const isStepCompleted = (stepPath: string) => {
    const step: { [key: string]: number } = {
      '/step-one': 1,
      '/step-two': 2,
      '/step-three': 3,
    };

    return step[stepPath] <= step[currentStep];
  };

  const steps = ['/step-one', '/step-two', '/step-three'];
  return (
    <div className={styles.progressIndicator}>
      <div className={styles.activeProgress} style={{ width: progressStep(currentStep) }}></div>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.dot} ${
            isStepCompleted(step) && step !== currentStep ? styles.completed : ''
          } ${step === currentStep ? styles.active : ''}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
