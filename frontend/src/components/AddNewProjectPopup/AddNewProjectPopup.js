import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import './AddNewProjectPopup.scss';

export default function AddNewProjectPopup({ openPopup, setOpenPopup }) {
  return (
    <div className="addNewProjectPopupContainer">
      <Popup
        open={openPopup}
        onCloseHandler={() => setOpenPopup(false)}
        showCloseIcon
      />
    </div>
  );
}

AddNewProjectPopup.propTypes = {
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
};

AddNewProjectPopup.defaultProps = {
  openPopup: false,
  setOpenPopup: () => {},
};
