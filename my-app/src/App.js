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
import { addTodo, initAddTodo, todoSlice } from './reducers/todoSlice.js';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value);
  const arr = [
    {
      'name':'Tender la cama',
      'description': 'Extender el edredón y ordenar las almohadas.',
      'date': '05/05/2025'
    },
    {
      'name':'Preparar café',
      'description': 'Preparar un café con 15g de café y 400g de agua. Lavar los utensilios.',
      'date': '06/05/2025'
    }
  ]

  useEffect(() => {
    arr.map((item)=> {
      dispatch(initAddTodo(item))
    })
  }, []);

  return (
    <div className="App">
           <Menu></Menu>
      <Container>
        <Row> 
        <Col><Formulary></Formulary></Col>
        <Col>
        {
          todos.map((todo,index) => {
            return (
              <Item key={index} name={todo.name} description={todo.description} date={todo.date}/>
            )
          })
        }

        </Col>
        </Row>
        
      </Container>
 
      
    </div>
  );
}

export default App;
