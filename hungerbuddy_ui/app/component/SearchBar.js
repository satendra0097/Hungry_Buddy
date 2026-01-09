import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Image
          src="/images/search.png"
          width={30}
          height={30}
          alt=""
          className={styles.icon}
        />

        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />

        <div className={styles.separator}></div>

        <Image
          src="/images/mic.png"
          width={30}
          height={30}
          alt=""
          className={styles.icon}
        />
      </div>
    </div>
  );
}
