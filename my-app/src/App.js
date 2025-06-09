import Container from 'react-bootstrap/esm/Container.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.scss';
import Item from './Components/Item.js';
import Menu from './Components/Menu.js';
import Formulary from './Components/Form.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoalsAsync } from './reducers/todoSlice.js';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items || []); // Add this line
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    dispatch(fetchGoalsAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <Menu></Menu>
      <Container>
        <Row> 
          <Col><Formulary></Formulary></Col>
          <Col>
            {status === 'loading' && <p>Loading...</p>}
            {todos.map((todo, index) => (
              <Item 
                key={todo._id || index}  // Better to use todo._id if available
                _id={todo._id}
                name={todo.name} 
                description={todo.description} 
                date={todo.dueDate || todo.date}  // Match your data structure
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
