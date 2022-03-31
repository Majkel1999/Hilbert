import PropTypes from 'prop-types';

import './ProjectItem.scss';

export default function ProjectItem({ name }) {
  return <div>{name}</div>;
}
ProjectItem.propTypes = {
  name: PropTypes.string,
};

ProjectItem.defaultProps = {
  name: '',
};
