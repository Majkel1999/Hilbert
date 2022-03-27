import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import './GenericForm.scss';

export default function GenericForm({
  header,
  onSubmitHandler,
  formInputArray,
  buttonText,
  customClass,
}) {
  return (
    <div className={`formContainer ${customClass}`}>
      <div className="formContent">
        <h1 className="formName">{header}</h1>
        <form className="form" onSubmit={onSubmitHandler}>
          {formInputArray.map((item) => (
            <Input
              key={item.label}
              labelName={item.label}
              type={item.inputType}
              id={item.label}
              onChangeHandler={(e) => item.setValue(e.target.value)}
              value={item.inputValue}
            />
          ))}
          <Button type="submit">{buttonText}</Button>
        </form>
      </div>
    </div>
  );
}
GenericForm.propTypes = {
  header: PropTypes.string,
  buttonText: PropTypes.string,
  customClass: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  formInputArray: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      inputType: PropTypes.string,
      setValue: PropTypes.func,
      value: PropTypes.string || PropTypes.number,
    }),
  ),
};
GenericForm.defaultProps = {
  header: '',
  buttonText: '',
  customClass: '',
  onSubmitHandler: () => {},
  formInputArray: [],
};
