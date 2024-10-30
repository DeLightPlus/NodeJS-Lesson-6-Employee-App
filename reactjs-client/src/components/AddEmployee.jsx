import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiSave2Fill, RiSearchEyeLine, RiDeleteBin2Line, RiEdit2Line } from '@remixicon/react';
import EmployeeCard from "./EmployeeCard";

function AddEmployee() {
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [image, setImage] = useState("");
    const [position, setPosition] = useState("");
    const [id, setID] = useState("");
    const [submittedData, setSubmittedData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [errors, setErrors] = useState({}); // State for holding validation errors

    const handleSubmits = async () => {
        const employee = { id, name, emailAddress, phoneNumber, position,  image };
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
        if (!employee.name) errors.name = "Name is required.";
        if (!employee.emailAddress) errors.emailAddress = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(employee.emailAddress)) errors.emailAddress = "Email is invalid.";
        if (!employee.phoneNumber) errors.phoneNumber = "Phone number is required.";
        if (!employee.position) errors.position = "Position is required.";
        if (!employee.ID) errors.ID = "ID is required.";
        return errors;
    };

    const clearForm = () => {
        setName("");
        setEmailAddress("");
        setPhoneNumber("");
        setImage("");
        setPosition("");
        setID("");
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

    const editEmployee = async (employeeId, updatedEmployee) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/employees/${employeeId}`, updatedEmployee);
            const data = response.data;
            console.log(data);

            const updatedEmployees = employees.map((employee) => 
                employee.id === employeeId ? updatedEmployee : employee
            );
            setEmployees(updatedEmployees);
            setEditingEmployee(updatedEmployee);
        } catch (error) {
            console.error("Error editing employee:", error);
        }
    };

    useEffect(() => {
        get_users();
    }, []);

    return (
        <div className="AddEmployees">
            <EmployeeCard employee={ {id, name, emailAddress, phoneNumber, position, image}}/>
            <div className="form-container">
                <h2>Add Employee</h2><hr/>
                <form className="">
                    <label className="">
                        Enter your name:
                        <input className=""
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {
                            errors.name && 
                                <span className="">{errors.name}</span>
                        }
                    </label>

                    <label>
                        Email address:
                        <input className="bg-gray border border-gray shadow rounded-sm"
                            type="text"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                        {
                            errors.emailAddress && 
                                <span className="">{errors.emailAddress}</span>
                        }
                    </label>

                    <label>
                        Phone number:
                        <input className=""
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {
                            errors.phoneNumber && 
                                <span className="">{errors.phoneNumber}</span>
                        }
                    </label>

                    <label>
                        Image:
                        <input type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                    </label>

                    <label>
                        Employee position:
                        <input className=""
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        {
                            errors.position && 
                                <span className="">{errors.position}</span>
                        }
                    </label>

                    <label>
                        ID:
                        <input className=""
                            type="text"
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                        />
                        {
                            errors.ID && 
                                <span className="text-red-500">{errors.ID}</span>
                        }
                    </label>

                    <button className="addemployee_btn" 
                        onClick={handleSubmits}
                    >
                        Submit
                    </button>
                </form>
            </div>            
        </div>
    );
}

export default AddEmployee;

