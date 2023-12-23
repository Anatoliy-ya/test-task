import styles from './cardForm.module.scss';

function CardForm({ children: children }: { children: React.ReactNode }) {
  return <div className={styles.cardForm}>{children}</div>;
}

export default CardForm;
