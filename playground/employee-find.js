const employee = require('../config/db');
const Employee = require('../models/employee');

//updating adding into an array
// Employee.findById('5b7667ffd717820e30386330').then(employee =>{
//     employee.hobbies.push('wathing movies');
//     employee.save().then(employee => console.log(employee))
//     .catch(err => console.log(err))
// })

//removing from array
// Employee.findById('5b7667ffd717820e30386330').then(employee =>{
//     let index = employee.luckyNumbers.indexOf(3)
//     if(index>=0)
//     employee.luckyNumbers.splice(index,1)
//     employee.save().then(employee => console.log(employee));
// })

//remove element from an array of objects 
// Employee.findById('5b7667ffd717820e30386330').then(employee =>{
//     employee.mobileNumbers.remove('5b7667ffd717820e30386331')
//     employee.save().then(employee => console.log(employee));
// })

//finding an object inside an array and updating it 
Employee.findById('5b7667ffd717820e30386330').then(employee =>{
    let contact = employee.mobileNumbers.id('5b7667ffd717820e30386331');
    contact.numType = 'personal';
    employee.save().then(employee => console.log(employee));
})

//adding an new object into an array
Employee.findById('5b7667ffd717820e30386330').then(employee =>{
    let contact = employee.mobileNumbers.push({
        numType:'office',
        mobileNumber:'121333121'
    })
    employee.save().then(employee => console.log(employee));
})

//updating an object
Employee.findById('5b7667ffd717820e30386330').then(employee =>{
    employee.address = {
        street:'bhadurpet',
        city:'Srikalahasti',
        pincode:517644
    }
    employee.save().then(employee => console.log(employee));
})
