import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import TabCreate from './TabCreate';
import TabRestore from './TabRestore';

function App() {
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>
          <Card.Title><h2>LH WALLETs</h2></Card.Title>
        </Card.Header>
        
        <Card.Body>
        <Tabs defaultActiveKey="encrypt" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="encrypt" title="Create">
            <TabCreate />
          </Tab>

          <Tab eventKey="decrypt" title="Restore">
            <TabRestore />
          </Tab>
        </Tabs>
        </Card.Body>

        <Card.Footer>
          <p className="small">Leandro Costa &copy; 2021</p>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default App;
