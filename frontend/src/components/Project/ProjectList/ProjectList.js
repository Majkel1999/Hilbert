import PropTypes from 'prop-types';
import ProjectItem from '../ProjectItem/ProjectItem';
import './ProjectList.scss';

export default function ProjectList({ items }) {
  return (
    <div className="tableContainer">
      {items.map((projectItem) => (
        <ProjectItem name={projectItem.name} />
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

ProjectList.defaultProps = {
  items: [],
};
