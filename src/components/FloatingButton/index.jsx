import plusIcon from "../../assets/plus-icon.svg";

import "./styles.css";

export function FloatingButton({ onClick, ...rest }) {
  return (
    <button
      className="floatingButton"
      type="button"
      onClick={onClick}
      {...rest}
    >
      <img src={plusIcon} alt="Ícone que representa adiciona nove elemento" />
    </button>
  );
}
