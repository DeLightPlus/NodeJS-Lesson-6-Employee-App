require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { doc, setDoc } = require('firebase/firestore');

const { getEmployees, getEmployeeById, addEmployee, deleteEmployeeById } = require('./controllers/auth');

const app = express();
const port = 8000;


app.use(express.json());

// CORS setup
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// API endpoint to get all employees
app.get('/api/employees', getEmployees);

// API endpoint to get a specific employee by ID
app.get('/api/employees/:id', getEmployeeById);

// API endpoint to create a new employee
app.post('/api/employees', addEmployee);

// DELETE /api/employees/:id - Delete an employee by ID
app.delete('/api/employees/:id', deleteEmployeeById);

// PUT /api/employees/:id - Update an employee by ID
app.put('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, position, image } = req.body;

    try 
    {
        const employeeDoc = doc(db, 'employees', id);
        await setDoc(employeeDoc, { name, email, phone, position, image }, { merge: true });
        res.status(200).send({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).send({ message: 'Error updating employee', error });
    }
});

// PATCH /api/employees/:id - Partially update an employee by ID
app.patch('/api/employees/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const employeeDoc = doc(db, 'employees', id);
        await setDoc(employeeDoc, req.body, { merge: true });
        res.status(200 ).send({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).send({ message: 'Error updating employee', error });
    }
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });