import "./styles.css";

export function Input({ label, id, classname, ...rest }) {
  return (
    <div className={`field ${classname}`}>
      <label htmlFor={id ? id : "#"}>{label}</label>
      <input id={id} {...rest} />
    </div>
  );
}
