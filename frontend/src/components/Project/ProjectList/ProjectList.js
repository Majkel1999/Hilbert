import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ProjectItem from '../ProjectItem/ProjectItem';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { projectsActions } from '../../../store/projects/projects-slice';
import './ProjectList.scss';

export default function ProjectList({ items }) {
  const dispatch = useDispatch();
  const title = 'test';
  const id = 'testId';

  const createNewProjectHandler = () => {
    dispatch(
      projectsActions.createNewProject({
        id,
        title,
      }),
    );
  };

  return (
    <div className="tableWrapper">
      <div className="header">
        <Input showLabel={false} labelName="Project name" />
        <Button
          text="Add new project"
          onClickHandler={createNewProjectHandler}
        />
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
