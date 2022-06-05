import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import './TagsStatisticsPopup.scss';

export default function TagsStatisticsPopup({
  open,
  onCloseHandler,
  prefferedTagsList,
}) {
  const headerText = 'Tags statistics';
  const popupBodyContent = (
    <div className="tagStatisticsBodyContent">
      <div className="tagListContainer">
        {prefferedTagsList.map((item, index) => (
          <div key={`${index.toString() * 9.7}`}>{item}</div>
        ))}
      </div>
    </div>
  );
  const popupButtons = [
    {
      text: 'Close',
      onClickHandler: () => onCloseHandler(false),
    },
  ];

  return (
    <div className="addNewProjectPopupContainer">
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

TagsStatisticsPopup.propTypes = {
  open: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  prefferedTagsList: PropTypes.array,
};

TagsStatisticsPopup.defaultProps = {
  open: false,
  onCloseHandler: () => {},
  prefferedTagsList: [],
};
