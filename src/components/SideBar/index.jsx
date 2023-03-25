import { Link } from "react-router-dom";

import "./styles.css";

import consultationIcon from "../../assets/consultation-icon.svg";
import pacientsIcon from "../../assets/pacients-icon.svg";
import doctorsIcon from "../../assets/doctors-icon.svg";

export function SideBar() {
  return (
    <nav className="containerNav">
      <div className="contentNav">
        <Link to="/">
          <img
            src={consultationIcon}
            alt="Ícone que representa a aba de consulta"
          />
        </Link>
        <Link to="/register/pacients">
          <img
            src={pacientsIcon}
            alt="Ícone que representa a aba de pacientes"
          />
        </Link>
        <Link to="/register/doctors">
          <img src={doctorsIcon} alt="Ícone que representa a aba de doutores" />
        </Link>
      </div>
    </nav>
  );
}
