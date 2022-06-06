import './DisplayMetricsPopup.scss';
import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';

export default function DisplayMetricsPopup({ open, onCloseHandler }) {
  const headerText = 'Model metrics';
  const popupBodyContent = <div className="tagStatisticsBodyContent"> </div>;
  const popupButtons = [
    {
      text: 'Close',
      onClickHandler: () => onCloseHandler(false),
    },
  ];

  return (
    <div className="displayMetricsPopupContainer">
      <Popup
        open={open}
        onCloseHandler={() => onCloseHandler(false)}
        showCloseIcon
        bodyContent={popupBodyContent}
        headerText={headerText}
        popupButtons={popupButtons}
      />
    </div>
  );
}

DisplayMetricsPopup.propTypes = {
  open: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
};

DisplayMetricsPopup.defaultProps = {
  open: false,
  onCloseHandler: () => {},
};
