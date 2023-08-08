import { Outlet } from 'react-router';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={['container', styles.container].join(' ')}>
          <h1 className={styles.logo}>Weather</h1>
        </div>
      </div>

      <main className={styles.main}>
        <section className={['container', styles.section].join(' ')}>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
