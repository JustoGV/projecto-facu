//Barra de navegacion de la pagina.

import React, { useEffect, useState } from "react";
import  "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  // Al montar, verificamos si hay usuario en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioName");
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioName");
    setUsername(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleUserClick = () => {
    navigate("/anfitrion");
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <svg
          className={styles.logoIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="var(--primary)"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z" />
        </svg>
        <h1>HomeSweetHome</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="¿A dónde vas?"
          className={styles.searchInput}
        />
      </div>

      {/* Sesión de usuario */}
      <div className={styles.userSession}>
        {username ? (
          <>
            <button className={styles.userBtn} onClick={handleUserClick}>
              {username}
            </button>
            <button className={styles.btnLogout} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button className={styles.btnLogin} onClick={handleLogin}>
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
