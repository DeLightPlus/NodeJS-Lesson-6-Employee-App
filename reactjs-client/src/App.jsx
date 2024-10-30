import { useState } from 'react';
import './App.css'

import Search from './components/Header';
import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
// import Form from './components/AddEmployee';



function App() 
{
  

  return (
    <div className='EmployeeApp'>      
      
      <Header />
      <hr/>     

      <div className='Employees'>
        <AddEmployee />
      </div>
    </div>

  )
}

export default App
