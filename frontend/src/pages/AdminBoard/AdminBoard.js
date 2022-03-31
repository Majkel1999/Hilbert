import './AdminBoard.scss';
import ProjectList from '../../components/Project/ProjectList/ProjectList';

const MOCKED_PROJECTS = [
  {
    name: 'Project 1',
  },
  {
    name: 'Project 2',
  },
  {
    name: 'Project 3',
  },
  {
    name: 'Project 4',
  },
  {
    name: 'Project 5',
  },
];

export default function AdminBoard() {
  return (
    <div className="adminBoardContainer">
      <ProjectList items={MOCKED_PROJECTS}> </ProjectList>
    </div>
  );
}
