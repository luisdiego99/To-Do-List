import Container from 'react-bootstrap/esm/Container.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.scss';
import Item from './Components/Item.js';
import Menu from './Components/Menu.js';
import Formulary from './Components/Form.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
           <Menu></Menu>
      <Container>
        <Row> 
        <Col><Formulary></Formulary></Col>
        <Col>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        </Col>
        </Row>
        
      </Container>
 
      
    </div>
  );
}

export default App;
