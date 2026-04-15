import styles from './styles.module.scss'
export function CheckboxGroupRoot({ children }) {
  return <div className={styles.checkboxGroup__container}>{children}</div>;
}
