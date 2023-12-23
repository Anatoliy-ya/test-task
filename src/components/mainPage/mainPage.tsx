import CardForm from '@/components/UI/cardForm';
import styles from './mainPage.module.scss';

import Avatar from '../UI/avatar';
import folderIcon from '@/assets/Interface/folder.svg';
import MainPageForm from './mainPageForm';

function MainPage() {
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      console.log('Ссылка скопирована в буфер обмена');
    });
  };

  return (
    <CardForm>
      <div className={styles.mainPage}>
        <div className={styles.header}>
          <Avatar />
          <div className={styles.userInfo}>
            <p>Зубарев Анатолий</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCopyLink('https://t.me/etoya250');
              }}>
              <img src={folderIcon} alt="Folder Icon" />
              Telegram
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCopyLink('https://github.com/Anatoliy-ya');
              }}>
              <img src={folderIcon} alt="Folder Icon" />
              GitHub
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCopyLink(
                  'https://togliatti.hh.ru/resume/9d814ce4ff0baf46c40039ed1f497945715063',
                );
              }}>
              <img src={folderIcon} alt="Folder Icon" />
              Резюме
            </a>
          </div>
        </div>
        <div className={styles.line}></div>
        <div>
          <MainPageForm />
        </div>
      </div>
    </CardForm>
  );
}

export default MainPage;
