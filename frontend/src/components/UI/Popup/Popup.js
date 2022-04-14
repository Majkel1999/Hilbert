import PropTypes, { arrayOf, shape } from 'prop-types';
import Button from '../Button/Button';
import './Popup.scss';

export default function Popup({
  open,
  headerText,
  headerContent,
  bodyContent,
  showCloseIcon,
  onCloseHandler,
  popupButtons,
}) {
  return open ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="headerTitle">
            <h2>{headerText}</h2>
          </div>
          {showCloseIcon && (
            <i
              className="fa fa-close close"
              aria-hidden="true"
              onClick={onCloseHandler}
            />
          )}
          {headerContent}
        </div>
        <div className="modal-body">{bodyContent}</div>
        <div className="buttons">
          {popupButtons.map((item) => (
            <Button text={item.text} onClickHandler={item.onClickHandler} />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

Popup.propTypes = {
  headerText: PropTypes.string,
  open: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  headerContent: PropTypes.node,
  bodyContent: PropTypes.node,
  onCloseHandler: PropTypes.func,
  popupButtons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      onClickHandler: PropTypes.func,
    }),
  ),
};

Popup.defaultProps = {
  headerText: '',
  open: false,
  showCloseIcon: false,
  headerContent: null,
  bodyContent: null,
  onCloseHandler: () => {},
  popupButtons: [],
};
