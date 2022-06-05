import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import './TagsStatisticsPopup.scss';
import { capitalizeFirstLetter } from '../../utils/utils';

// MOCKED DATA
// const mockedData = [
//   {
//     love: 0.8,
//   },
//   { sad: 0.54 },
//   { tak: 1 },
//   { nie: 0.11 },
// ];

export default function TagsStatisticsPopup({
  open,
  onCloseHandler,
  // eslint-disable-next-line no-unused-vars
  prefferedTagsList,
}) {
  const headerText = 'Tags statistics';
  const popupBodyContent = (
    <div className="tagStatisticsBodyContent">
      {prefferedTagsList.length !== 0 ? (
        <>
          <h2> Tag statistics returned by model</h2>
          <div className="tagListContainer">
            <h5>Tag - Accuracy</h5>
            {prefferedTagsList.map((item, index) => (
              <div key={`${index.toString() * 9.7}`}>
                <span className="value">
                  {`${capitalizeFirstLetter(Object.keys(item)[0])}:`}
                </span>

                <span className="percent">{Object.values(item)[0] * 100}%</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Currently there is no data about text tags</p>
      )}
    </div>
  );
  const popupButtons = [
    {
      text: 'Close',
      onClickHandler: () => onCloseHandler(false),
    },
  ];

  return (
    <div className="tagStatisticsPopupContainer">
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
