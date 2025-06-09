import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Item.scss';
import { useDispatch } from 'react-redux';
import { deleteGoalAsync } from '../reducers/todoSlice'; 

function Item({ _id, name, description, date}) {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!_id) {
      console.error('No ID provided for deletion');
      return;
    }
    try {
      await dispatch(deleteGoalAsync(_id)); 
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // I Still need an edit function, you would need to implement it
  const editItem = (e) => {
    e.preventDefault();

  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="fw-bold">
          Description
        </Card.Text>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text className="fw-bold">
          Due Date
        </Card.Text>
        <Card.Text>
          {date}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Button variant="info" onClick={editItem}>Editar</Button>
        <Button variant="info" onClick={handleDelete}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
