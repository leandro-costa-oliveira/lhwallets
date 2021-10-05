import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import TabCreate from './TabCreate';

function App() {
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>
          <Card.Title><h2>LH WALLETs</h2></Card.Title>
        </Card.Header>
        
        <Card.Body>
          <TabCreate />
        </Card.Body>

        <Card.Footer>
          <span className="small float-start">Leandro Costa &copy; 2021</span>
          <a href="https://github.com/lokidarkeden/lhwallets" 
            target="_lhwallets_git" 
            className="small float-end"
          >View on Github</a>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default App;
