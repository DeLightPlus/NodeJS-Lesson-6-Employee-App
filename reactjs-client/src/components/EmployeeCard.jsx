import React from 'react';

const EmployeeCard = ({ employee }) => {
  return (   
      
      <div className="employee_card">  
        { console.log(employee) }
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
          <h1>{employee.employeeId}</h1>
          <big>{employee.name}</big><br/>                 
          <strong>{employee.position}</strong><hr/>
          <small>{employee.email}</small><br/>  
          <small>{employee.phone}</small> 
        </div>      

        {/* <button onClick={() => editEmployee(employee.id, employee)}>Edit</button> */}
        {
          /* <button onClick={async () => {
            try {
              await axios.delete(`http://localhost:8000/employees/${employee.id}`);
              console.log("deleted");
            } catch (error) {
              console.error("Error deleting employee:", error);
            }
          }}>Delete</button> */
        }

      </div>
    
  );
};

export default EmployeeCard;