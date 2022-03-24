import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../utils/utils';

export default function GenericForm({
  header,
  onSubmitHandler,
  formInputArray,
  buttonText,
}) {
  return (
    <div className="formContainer">
      <h1 className="formName">{header}</h1>
      <form onSubmit={onSubmitHandler}>
        {formInputArray.map((item) => (
          <div className="inputContainer">
            <label htmlFor={item.label}>
              {capitalizeFirstLetter(item.label)}:
            </label>
            <input
              type={item.inputType}
              id={item.label}
              autoComplete="off"
              onChange={(e) => item.setValue(e.target.value)}
              value={item.inputValue}
              required
            />
          </div>
        ))}
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
}
GenericForm.propTypes = {
  header: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  formInputArray: PropTypes.arrayOf,
};
GenericForm.defaultProps = {
  header: '',
  buttonText: '',
  onSubmitHandler: () => {},
  formInputArray: [],
};
