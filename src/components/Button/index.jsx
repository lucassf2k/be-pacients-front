import './styles.css';

export function Button({ styleButton, title, ...rest }) {
  return (
    <button className={`btn ${styleButton ? styleButton : 'primary'}`} type="submit" {...rest} >
      {title}
    </button>
  )
}