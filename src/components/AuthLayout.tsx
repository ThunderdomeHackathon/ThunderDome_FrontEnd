import styles from "../styles/AuthLayout.module.scss";
import MainLayout from "./utility/MainLayout";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className={styles.authForm}>{children}</div>
      </div>
    </MainLayout>
  );
}
