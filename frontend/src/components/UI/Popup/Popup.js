import PropTypes from 'prop-types';
import './Popup.scss';

export default function Popup({
  open,
  headerContent,
  bodyContent,
  showCloseIcon,
  onCloseHandler,
}) {
  return open ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
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
      </div>
    </div>
  ) : null;
}

Popup.propTypes = {
  open: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  headerContent: PropTypes.node,
  bodyContent: PropTypes.node,
  onCloseHandler: PropTypes.func,
};

Popup.defaultProps = {
  open: false,
  showCloseIcon: false,
  headerContent: null,
  bodyContent: null,
  onCloseHandler: () => {},
};
