import PropTypes from 'prop-types';
import './Popup.scss';

export default function Popup({ open, headerContent, bodyContent }) {
  return open ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close">&times;</span>
          {headerContent}
        </div>
        <div className="modal-body">{bodyContent}</div>
      </div>
    </div>
  ) : null;
}

Popup.propTypes = {
  open: PropTypes.bool,
  headerContent: PropTypes.node,
  bodyContent: PropTypes.node,
};

Popup.defaultProps = {
  open: false,
  headerContent: null,
  bodyContent: null,
};
