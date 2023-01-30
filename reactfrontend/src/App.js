import {HashRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Mainhomepage from './components/mainhomepage';
import Attendance from './components/attendance';
import './App.css'
import EmployeePage from './components/employeepage';
import Addemployee from './components/addemployee';
import SearchEmployee from './components/searchemployee';
import ViewALL from './components/viewALL'
import ViewEmployee from './components/viewemployee';
import DeleteEmployee from './components/deleteemployee';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
  return (
    <HashRouter>
      <Navbar/>
      <Routes>
      <Route
       exact
        path='/'
         element={<Mainhomepage/>}
         />
         <Route 
         exact
         path='/Attendance'
         element={<Attendance/>}
         />
         <Route
         exact
         path='/Employeepage'
         element={<EmployeePage/>}
         />
         <Route
         exact 
         path='/Addemployee'
         element={<Addemployee/>}
         />
         <Route 
         exact
         path='/SearchEmployee'
         element={<SearchEmployee/>}
         />
         <Route
         exact
         path='/viewALL'
         element={<ViewALL/>}
         />
         <Route
         exact
         path='/ViewEmployee'
         element={<ViewEmployee/>}
         />
         <Route
         exact
         path='/DeleteEmployee'
         element={<DeleteEmployee/>}
         />
         
         <Route
         exact
         path='/UpdateEmployee/:id'
         element={<UpdateEmployee/>}
         />
      </Routes>
    </HashRouter>
  );
}

export default App;
