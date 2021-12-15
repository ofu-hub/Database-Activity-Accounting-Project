import {
  Navbar,
  Container,
  Nav
} from 'react-bootstrap';
import { Routes } from 'react-router';
import Home from './Home';
import Hall from './Hall';
import Trainers from './Trainers';
import Subs from './Subs';
import Visits from './Visits';
import Payment from './Payment'
import Clients from './Clients';
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
          <Route path='/' element={<Home/>}/>    
          <Route path='hall' element={<Hall/>}/>
          <Route path='trainers' element={<Trainers/>}/>
          <Route path='subs' element={<Subs/>}/>
          <Route path='visits' element={<Visits/>}/>
          <Route path='payment' element={<Payment/>}/>
          <Route path="clients" element={<Clients/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;