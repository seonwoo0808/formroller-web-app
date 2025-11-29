import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

import MainLayout from './components/layout/mainLayout';
import HomePage from './pages/home';
import MeasurementPage from './pages/measurement';
import StorePage from './pages/store';

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<MeasurementPage />} path='/measurements' />
          <Route element={<StorePage />} path='/store' />
          <Route element={<HomePage />} path='/' />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
