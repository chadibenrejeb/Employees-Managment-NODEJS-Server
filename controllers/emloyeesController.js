const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req , res) => {
    res.json(data.employees);
} 

const createNewEmployee = (req , res) => {
    const newEmployee = {
        id : data.employees[data.employees.length - 1].id + 1 || 1 ,
        firstname : req.body.firstname ,
        lastname : req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'message' : 'Fist Name and Last Name are required'});
    }
    
    data.setEmployees([...data.employees , newEmployee]);
    res.status(201).json(data.employees);
}


const updateEmployee = (req, res) => {
    const employee = data.employee.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    if(req.body.firstname) employee.firstname = req.body.firstname ;
    if(req.body.lastname) employee.lastname = req.body.lastname ;
    const filtredArray = [...filtredArray.filter(emp => emp.id !== parseInt(req.body.id))];
    const unsortedArray = [...filtredArray , employee];
    data.setEmployees(unsortedArray.sort((a , b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
} 

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    const filtredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filtredArray]);
    res.json(data.employees);
} 


const getEmployee = (req, res) => {
    res.json({ "id": req.params.id }); // esta3malna params mech body  khater nejbdou fel id mel URL directement
}; 

module.exports = {
    getAllEmployees , 
    createNewEmployee , 
    updateEmployee , 
    deleteEmployee , 
    getEmployee
}
