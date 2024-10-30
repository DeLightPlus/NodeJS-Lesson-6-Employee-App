import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";

function AddEmployee() {
    const [employeeId, setEmployeeId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmailAddress] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [img_url, setImage] = useState(""); // Ensure this is consistent
    const [position, setPosition] = useState("");
    
    const [submittedData, setSubmittedData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState({}); // State for holding validation errors

    const handleSubmits = async (e) => {
        e.preventDefault();

        const employee = { employeeId, name, email, phone, position, img_url };
        console.log('adding, ', employee);
        
        const validationErrors = validateInputs(employee);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop submission if there are validation errors
        }

        try {
            const response = await axios.post("http://localhost:8000/api/employees", employee);
            const data = response.data;

            setSubmittedData(employee);
            console.log(data);
            clearForm(); // Clear form after successful submission
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const validateInputs = (employee) => {
        const errors = {};

        if (!employee.employeeId) errors.employeeId = "ID is required."; // Corrected property
        if (!employee.name) errors.name = "Name is required.";
        if (!employee.email) errors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(employee.email)) errors.email = "Email is invalid.";
        if (!employee.phone) errors.phone = "Phone number is required.";
        if (!employee.position) errors.position = "Position is required.";
        
        return errors;
    };

    const clearForm = () => {
        setName("");
        setEmailAddress("");
        setPhoneNumber("");
        setImage(""); // Clear image URL
        setPosition("");
        setEmployeeId("");
        setErrors({}); // Clear errors on form reset
    };

    const get_users = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/employees");
            const data = response.data;
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        get_users();
    }, []);

    return (
        <div className="AddEmployees">
            <EmployeeCard employee={{ employeeId, name, email, phone, position, img_url }} />
            <div className="form-container">
                <h2>Add Employee</h2><hr/>
                <form onSubmit={handleSubmits}>
                    <label>
                        ID:
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                        {errors.employeeId && <span className="text-red-500">{errors.employeeId}</span>}
                    </label>
                    
                    <label>
                        Enter your name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <span>{errors.name}</span>}
                    </label>

                    <label>
                        Email address:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </label>

                    <label>
                        Phone number:
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phone && <span>{errors.phone}</span>}
                    </label>

                    <label className="image_preview">                        
                        {
                            img_url && (
                                <div>
                                    <h3>Preview:</h3>
                                    <img src={img_url} alt="Preview" style={{ height: "150px", objectFit: "cover" }} />
                                </div>
                            )
                        }
                        <div>Image: 
                        <input
                            type="file"
                            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        /></div>
                        
                    </label>

                    <label>
                        Employee position:
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        {errors.position && <span>{errors.position}</span>}
                    </label>                    

                    <button className="addemployee_btn" type="submit">
                        Submit
                    </button>
                </form>
            </div>            
        </div>
    );
}

export default AddEmployee;