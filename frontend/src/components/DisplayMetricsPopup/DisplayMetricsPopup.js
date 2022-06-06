/* eslint-disable react/forbid-prop-types */
import './DisplayMetricsPopup.scss';
import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';

export default function DisplayMetricsPopup({
  open,
  onCloseHandler,
  metricsData,
}) {
  const headerText = 'Model metrics';
  const popupBodyContent = (
    <div className="tagStatisticsBodyContent">
      <p>{JSON.stringify(metricsData)}</p>
    </div>
  );
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
  metricsData: PropTypes.shape({
    configData: PropTypes.any,
    trainData: PropTypes.any,
  }),
};

DisplayMetricsPopup.defaultProps = {
  open: false,
  onCloseHandler: () => {},
  metricsData: {
    configData: null,
    trainData: null,
  },
};
