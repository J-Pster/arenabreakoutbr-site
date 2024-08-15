import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Bem vindo ao Arena Breakout Brasil!</h1>
      <nav>
        <ul>
          <li>
            <Link href="/municoes">Gráfico de Munições</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
