import PropTypes from 'prop-types';
import ProjectItem from '../ProjectItem/ProjectItem';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './ProjectList.scss';

export default function ProjectList({ items }) {
  return (
    <div className="tableWrapper">
      <div className="header">
        <Input showLabel={false} labelName="Project name" />
        <Button text="Add new project" />
      </div>
      <table className="tableContainer">
        <thead className="tableHeader">
          <tr className="head">
            <th>#</th>
          </tr>
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
