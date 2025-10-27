

import React, { useState } from "react";
import "../styles/Hero.css";

const Hero: React.FC = () => {
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1");

  const [errors, setErrors] = useState({
    location: "",
    checkin: "",
    checkout: "",
  });

  // Función de validación de Variables
  const validate = () => {
    const newErrors = { location: "", checkin: "", checkout: "" };
    let valid = true;

    if (!location) {
      newErrors.location = "Ingresa una ubicación.";
      valid = false;
    }

    if (!checkin) {
      newErrors.checkin = "Selecciona una fecha de llegada.";
      valid = false; 
    }

    if (!checkout) {
      newErrors.checkout = "Selecciona una fecha para salir.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSearch = () => {
    if (!validate()) return;

    console.log("Buscando alojamiento:", {
      location,
      checkin,
      checkout,
      guests,
    });

    alert(
      `Buscando en ${location} desde ${checkin} hasta ${checkout} para ${guests} huésped(es).`
    );
  };

  
  //  Retornamos el JSX del componente
  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Encuentra tu lugar perfecto</h2>
      <p>Descubre alojamientos únicos para vivir experiencias inolvidables</p>

      <div style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Ubicación</label>
          <input
            type="text"
            placeholder="¿A dónde vas?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label>Llegada</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
          />
          {errors.checkin && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.checkin}
            </p>
          )}
        </div>

        <div>
          <label>Salida</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
          />
          {errors.checkout && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.checkout}
            </p>
          )}
        </div>

        <div>
          <label>Huéspedes</label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1 huésped</option>
            <option value="2">2 huéspedes</option>
            <option value="3">3 huéspedes</option>
            <option value="4+">4+ huéspedes</option>
          </select>
        </div>

        <button
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </section>
  );
};

export default Hero;
