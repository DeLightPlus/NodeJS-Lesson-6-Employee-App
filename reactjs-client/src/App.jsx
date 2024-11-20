import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';


function App() 
{
  const [employees, setEmployees] = useState([]);
  const get_users = async () => 
    {
      try 
      {
          const response = await axios.get("http://localhost:8000/api/employees");
          const data = response.data;
          console.log(data);
          
          setEmployees(data);
      } 
      catch (error) 
      {
          console.error("Error fetching employees:", error);
      }
  };

  useEffect(() => {
        get_users();
    }, []);

  return (
    <div className='EmployeeApp'>      
      
      <Header employees={employees}/>
      <hr/>     

      <div className='Employees'>
        <AddEmployee />
        <EmployeeList employees={ employees }/>
      </div>
    </div>
    

  )
}

export default App
