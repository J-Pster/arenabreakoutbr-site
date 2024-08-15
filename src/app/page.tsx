import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo ao Arena Breakout Brasil!</h1>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/municoes" className={styles.navLink}>
                Gráfico de Munições
              </Link>
            </li>
            <li>
              <a
                href="https://discord.gg/52qZPhVUqu"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navLink} ${styles.discordLink}`}
              >
                <FaDiscord /> Discord
              </a>
            </li>
          </ul>
        </nav>

        <p className={styles.message}>
          Estamos constantemente criando novas páginas e conteúdo para melhorar
          sua experiência. Se você tiver alguma ideia ou sugestão, não hesite em
          entrar em contato com <b>JoaoPster</b> no Discord da nossa comunidade!
        </p>
      </div>
    </main>
  );
}
