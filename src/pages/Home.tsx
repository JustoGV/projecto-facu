

import React from "react";
import styles from "./Home.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Properties from "./components/Properties";
import Experiences from "./components/Experiences";

const Home: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className={styles.main}>
        <Hero />
        <Categories />
        <Properties />
        <Experiences />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}></div>
      </footer>
    </>
  );
};

export default Home;
