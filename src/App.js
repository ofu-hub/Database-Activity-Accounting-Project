import './App.css';
import {
  Navbar,
  Container,
  Nav
} from 'react-bootstrap';
import { Routes } from 'react-router';
import { Clients } from './Clients';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/home" className="">Учёт деятельности фитнес центров</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Главная</Nav.Link>
                <Nav.Link href="/hall">Залы</Nav.Link>
                <Nav.Link href="/trainers">Тренера</Nav.Link>
                <Nav.Link href="/subs">Абонементы</Nav.Link>
                <Nav.Link href="/visits">Посещения</Nav.Link>
                <Nav.Link href="/payment">Выписки</Nav.Link>
                <Nav.Link href="/clients">Клиенты</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Routes>
          <Route path="/clients" component={Clients}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
