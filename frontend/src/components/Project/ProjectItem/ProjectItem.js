/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';

import './ProjectItem.scss';

export default function ProjectItem({ name, onClickHandler }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="item" onClick={onClickHandler}>
      <span className="itemName">{name}</span>
    </div>
  );
}
ProjectItem.propTypes = {
  name: PropTypes.string,
  onClickHandler: PropTypes.func,
};

ProjectItem.defaultProps = {
  name: '',
  onClickHandler: () => {},
};
