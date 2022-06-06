import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import './TagsStatisticsPopup.scss';
import { capitalizeFirstLetter } from '../../utils/utils';

export default function TagsStatisticsPopup({
  open,
  onCloseHandler,
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
            {Object.keys(prefferedTagsList).map((item, index) => (
              <div key={`${index.toString() * 9.7}`}>
                <span className="value">
                  {`${capitalizeFirstLetter(item)}:`}
                </span>

                <span className="percent">
                  {(prefferedTagsList[item] * 100).toFixed(2)}%
                </span>
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
