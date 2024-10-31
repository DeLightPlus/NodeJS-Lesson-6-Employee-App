import axios from 'axios';
import React from 'react';

const EmployeeCard = ({ employee }) => {

  const handleDelete = async () => 
    {
      try 
      {
        await axios.delete(`http://localhost:8000/api/employees/${employee.id}`);
        console.log("deleted");
        window.location.reload();
      } 
      catch (error) 
      {
        console.error("Error deleting employee:", error);
      }
    }

  return (         
      <div className="employee_card">  
        <div className="top">
          {employee.id && console.log(employee.id) }
          {
            employee.imageUrl ?
              (
                <div className='employee_avatar'>
                    <h3></h3>
                    <img src={employee.imageUrl} alt="Preview" style={{ height: "128px", width:"128px", objectFit: "cover" }} />
                </div>
              ) : (
                <div className='employee_avatar'>
                    <h3></h3>
                    <img src={employee.img_url} alt="Preview" style={{ height: "128px", width:"128px", objectFit: "cover" }} />
                </div>
              )
          }

          <div className="employee_details">
            <big>{employee.name}</big><br/>                 
            <strong>{employee.position}</strong>
            <h1>{employee.employeeId}</h1>
            <hr/>
            <div>
              <small>{employee.email}</small><br/>  
              <small>{employee.phone}</small> 
            </div>          
          </div>    
        </div> 

        {
          employee.imageUrl &&
          <div className="button_group">
            <button> Edit</button>
            <button onClick={handleDelete}>Delete</button> 
          </div>
              
        }      

      </div>
    
  );
};

export default EmployeeCard;