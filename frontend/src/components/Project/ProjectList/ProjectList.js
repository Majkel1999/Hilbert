import PropTypes from 'prop-types';
import ProjectItem from '../ProjectItem/ProjectItem';
import './ProjectList.scss';

export default function ProjectList({ items }) {
  return (
    <table className="tableContainer">
      <thead className="tableHeader">
        <th className="head">#</th>
        <tr>
          <th>Project name</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {items.map((projectItem, index) => (
          <tr className="contentWrapper" key={`${projectItem.name}key`}>
            <th className="head">{index}</th>
            <td>
              <ProjectItem name={projectItem.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
