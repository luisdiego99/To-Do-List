import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addGoalAsync } from '../reducers/todoSlice';

function Formulario() {
  const dispatch = useDispatch();
  const inputRefName = useRef();
  const inputRefDescription = useRef();
  const inputRefDueDate = useRef();

  const addItem = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!inputRefName.current.value || 
        !inputRefDescription.current.value || 
        !inputRefDueDate.current.value) {
      alert('Please fill all fields');
      return;
    }

    try {
      await dispatch(addGoalAsync({
        name: inputRefName.current.value,
        description: inputRefDescription.current.value,
        dueDate: inputRefDueDate.current.value
      })).unwrap();
      
      // Clear form after successful submission
      inputRefName.current.value = '';
      inputRefDescription.current.value = '';
      inputRefDueDate.current.value = '';
    } catch (error) {
      console.error('Failed to save goal:', error);
      alert('Failed to save goal. Please try again.');
    }
  };

  return (
    <div className='space'>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="" 
            ref={inputRefName}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            type="text" 
            placeholder="" 
            ref={inputRefDescription}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
            type="date" 
            ref={inputRefDueDate}
            required
          />
        </Form.Group>
        <Button variant="info" onClick={addItem}>Add Goal</Button>
      </Form>
    </div>
  );
}

export default Formulario;
