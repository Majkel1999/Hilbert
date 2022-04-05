import PropTypes from 'prop-types';

import './ProjectItem.scss';

export default function ProjectItem({ name }) {
  return (
    <div className="item">
      <span className="itemName">{name}</span>
    </div>
  );
}
ProjectItem.propTypes = {
  name: PropTypes.string,
};

ProjectItem.defaultProps = {
  name: '',
};
