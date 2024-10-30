const { collection, getDocs, doc, 
    getDoc, addDoc, deleteDoc, setDoc 
} = require('firebase/firestore');

const { db } = require('../firebase/config');

const getEmployees = async (req, res) => {
    try {
        const employeesCollection = collection(db, 'employees');
        const employeeSnapshot = await getDocs(employeesCollection);
        const employees = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send({ message: 'Error fetching employees', error });
    }
}

const getEmployeeById = async (req, res) => {
    const id = req.params.id;

    try {
        const employeeDoc = doc(db, 'employees', id);
        const employeeSnapshot = await getDoc(employeeDoc);

        if (employeeSnapshot.exists()) {
            res.json({ id: employeeSnapshot.id, ...employeeSnapshot.data() });
        } else {
            res.status(404).send({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).send({ message: 'Error fetching employee', error });
    }
}

const addEmployee = async (req, res) => {
    const { employeeId, name, email, phone, position } = req.body;
    const photo = req.file;



    if (!employeeId || !name || !email || !phone || !position) 
    {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try 
    {
        const newEmployee = { employeeId, name, email, phone, position, img_url };
        const docRef = await addDoc(collection(db, 'employees'), newEmployee);
        res.status(201).json({ id: docRef.id, ...newEmployee });
    } 
    catch (error) 
    {
        console.error("Error adding employee:", error);
        res.status(500).send({ message: 'Error adding employee', error });
    }
}

const deleteEmployeeById = async (req, res) => {
    const id = req.params.id;

    try 
    {
        const employeeDoc = doc(db, 'employees', id);
        await deleteDoc(employeeDoc);
        res.status(200).send({ message: 'Employee deleted successfully' });
    } 
    catch (error) 
    {
        console.error("Error deleting employee:", error);
        res.status(500).send({ message: 'Error deleting employee', error });
    }
}

module.exports = { getEmployees, getEmployeeById, addEmployee, deleteEmployeeById }