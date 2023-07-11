import styles from  "../../styles/MainLayout.module.scss";

type Props = {
   children: React.ReactNode;
}

export default function MainLayout({children}: Props) {
   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <h1>Thunderdome</h1>
         </div>
         {children}
      </div>
   )
}