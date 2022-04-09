import TagList from '../../components/Tags/TagList';
import './OpenedProject.scss';

const MOCKED_TAGS = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'];

export default function OpenedProject() {
  return <TagList tags={MOCKED_TAGS} />;
}
