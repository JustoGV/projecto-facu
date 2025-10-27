import React from "react";
import styles from "./Categories.module.css";

const categories = [
  { icon: "🏠", name: "Casas" },
  { icon: "🏙️", name: "Departamentos" },
  { icon: "🏖️", name: "Playa" },
  { icon: "⛰️", name: "Montaña" },
  { icon: "🏰", name: "Únicos" },
  { icon: "🌳", name: "Camping" },
  { icon: "🏊‍♂️", name: "Piscinas" },
  { icon: "🏕️", name: "Cabañas" },
];

const Categories: React.FC = () => (
  <section className={styles.categories}>
    <h2 className={styles.sectionTitle}>Explora por categoría</h2>
    <div className={styles.grid}>
      {categories.map((c) => (
        <div key={c.name} className={styles.card}>
          <div className={styles.icon}>{c.icon}</div>
          <div className={styles.name}>{c.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Categories;
