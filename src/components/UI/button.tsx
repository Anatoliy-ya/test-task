import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'Start' | 'Back';
  type?: string;
  id?: string;
  onClick?: () => void;
}
function Button({ children, variant, onClick }: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
