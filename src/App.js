import Acceuil from './pages/Acceuil';
import Connexion from './pages/Connexion';
import Register from './pages/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes,Route} from 'react-router-dom';
import { createContext } from 'react';
import RouteProtector from './components/RouteProtector';




function App() {

  const token =createContext("")

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={ <Connexion /> } />
        </Routes>

        <Routes>
          <Route element={<RouteProtector />}>
            <Route path="/home" element={ <Acceuil /> }  />
          </Route>
        </Routes>
    </Router>
      
      
    </>
    
    
  )
}

export default App;
