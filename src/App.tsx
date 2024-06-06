import './App.css';
import Dashboard from './components/Dashbord';
import Sidebar from './components/Sidebar';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reports from './components/Reports';
import Setting from './components/Settings';
import Contact from './components/Contact';

function App() {

  return (
    <Router>
      <div className='App' >
        <Sidebar />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
