import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss'
import { useSelector,useDispatch } from 'react-redux';
import { useRef } from 'react';
import {
  removeTodo,
  addTodo
} from '../reducers/todoSlice.js';

function Formulario() {
  const dispatch = useDispatch();
  const inputRefName = useRef();
  const inputRefDescription = useRef();
  const inputRefDueDate = useRef();

  const addItem = (e) => {
    e.preventDefault();
    dispatch(addTodo({
      'name': inputRefName.current.value,
      'description': inputRefDescription.current.value,
      'date': inputRefDueDate.current.value
    }))
  }

  return (
  <div className='space'>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="" ref={inputRefName}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} type="text" placeholder="" ref={inputRefDescription} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" ref={inputRefDueDate}/>
      </Form.Group>
      <Button variant="info" onClick={addItem}>Add Goal</Button>
    </Form>
  </div>
 
  );
}

export default Formulario;