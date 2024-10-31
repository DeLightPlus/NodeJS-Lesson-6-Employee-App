const { collection, getDocs, doc, 
    getDoc, addDoc, deleteDoc, setDoc 
} = require('firebase/firestore');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { db, storage } = require('../firebase/config'); 

const getEmployees = async (req, res) => {
    try 
    {
        const employeesCollection = collection(db, 'employees');
        const employeeSnapshot = await getDocs(employeesCollection);
        const employees = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       
        // listAll(ref(storage, 'files'))
        // .then(images => { 
        //     console.log('images', images.items)
        // })
        res.json(employees);
    } 
    catch (error) 
    {
        console.error("Error fetching employees:", error);
        res.status(500).send({ message: 'Error fetching employees', error });
    }
}

const getEmployeeById = async (req, res) => {
    const id = req.params.id;

    try 
    {
        const employeeDoc = doc(db, 'employees', id);
        const employeeSnapshot = await getDoc(employeeDoc);

        if (employeeSnapshot.exists()) 
        {
            res.json({ id: employeeSnapshot.id, ...employeeSnapshot.data() });
        } 
        else 
        {
            res.status(404).send({ message: 'Employee not found' });
        }
    } 
    catch (error) 
    {
        console.error("Error fetching employee:", error);
        res.status(500).send({ message: 'Error fetching employee', error });
    }
}

const uploadImage = async (file, id) => {
    if (!file) return null;
    const imageRef = ref(storage, `files/${id}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
};

const addEmployee = async (req, res) => {
    const { employeeId, name, email, phone, position, image } = req.body;

    const photo = req.file;
    console.log(photo, ' vs ', image);
    const imageUrl = await uploadImage(image, employeeId);

    if (!employeeId || !name || !email || !phone || !position || !imageUrl) 
    {
        return res.status(400).json({ error: 'Missing required fields' });
    }
"https://firebasestorage.googleapis.com/v0/b/restlebnb-hotel-app.appspot.com/o/files%2F20201030SD99?alt=media&token=e26a7f49-9588-4b6b-a9ef-358fd7702284"

    try 
    {   
        const newEmployee = { employeeId, name, email, phone, position, imageUrl };
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