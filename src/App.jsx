import {
  Navbar,
  Container,
  Nav
} from 'react-bootstrap';
import { Routes } from 'react-router';
import Clients from './Clients';
import Home from './Home';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Link to="/" className="navbar-brand">Учёт деятельности фитнес-центра</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className = "nav-link" to="/">Главная</Link>
                <Link className = "nav-link" to="hall">Залы</Link>
                <Link className = "nav-link" to="trainers">Тренера</Link>
                <Link className = "nav-link" to="subs">Абонементы</Link>
                <Link className = "nav-link" to="visits">Посещения</Link>
                <Link className = "nav-link" to="payment">Выписки</Link>
                <Link className = "nav-link" to="clients">Клиенты</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Routes>
          <Route path="clients" element={<Clients/>}/>
          <Route path='/' element={<Home/>}/>    
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;