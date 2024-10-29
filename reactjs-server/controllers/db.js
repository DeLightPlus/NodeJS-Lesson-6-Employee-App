const { collection, addDoc, getDocs } = require('firebase/firestore');
const {db} = require("../firebase/config")

const addEmployee = async (req, res) =>
{
    const {employee_id, name, email, phone, position, img_url} = req.body;
    try 
    {
        const docRef = await addDoc( collection(db, "employees"),
        { employee_id, name, email, phone, position, img_url });

        res.json({message: "added successfully."});
        console.log("Document Written with ID: ", docRef.id)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error:"Error adding document"})
    }
}

const getEmployees = async (req, res) =>
{
    try
    {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const employees = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        res.status(200).json({message: "added successfully.", employees: employees });
    }
    catch(error){
        console.error("Error fetching employees: ", error);
        res.status(500).json({ message:"Error fetching employees", error: error.message })
    }

}

module.exports = { addEmployee, getEmployees }