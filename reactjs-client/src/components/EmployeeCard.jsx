import React from 'react';

const EmployeeCard = ({ employee }) => {
  return (   
      
      <div className="employee_card">  
        {/* { console.log(employee) } */}
        {
          employee.img_url && 
            (
              <div className='employee_avatar'>
                  <h3></h3>
                  <img src={employee.img_url} alt="Preview" style={{ height: "150px", objectFit: "cover" }} />
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
            <small>{employee.phone}</small> | 

            <button> Edit</button>
            {
              <button onClick={async () => {
                // try {
                //   await axios.delete(`http://localhost:8000/employees/${employee.id}`);
                //   console.log("deleted");
                // } catch (error) {
                //   console.error("Error deleting employee:", error);
                // }
              }}>Delete</button> 
            }

          </div>
        </div>      

        

      </div>
    
  );
};

export default EmployeeCard;