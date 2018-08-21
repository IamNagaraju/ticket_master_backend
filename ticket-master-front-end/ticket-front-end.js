let url = 'http://localhost:3000/employee';

let nameHandle = document.getElementById('name');
let dataHandle = document.getElementById('data');
let employeeHandle = document.getElementById('employee')
let formHandle = document.getElementById('addContact')
let numTypeHandle = document.getElementById('numType');
let numberHandle = document.getElementById('number')
let countHandle = document.getElementById('count')
let employees;

function del(emp,name) {
    axios.delete(`http://localhost:3000/employee/${name}/mobile_numbers/${emp}`).then(response =>{
        showData();
    })
}

function getEmployee(emp) {
    let h2Tag1 = document.createElement('h2');
    h2Tag1.innerHTML = emp.name;
    let h2Tag2 = document.createElement('h2');
    let text = document.createTextNode('Mobile Number')
    nameHandle.appendChild(h2Tag1);
    h2Tag2.appendChild(text);
    nameHandle.appendChild(h2Tag1);
    let ol = document.createElement('ol');

    emp.mobileNumbers.forEach(employee => {
        let specific = emp._id;
        ol.innerHTML += `
        <li>${employee.numType} ${employee.mobileNumber} <input type = "button" value="Remove" name ="${specific}"  id="${employee._id}" onclick="del(this.id,this.name)"/> </li>`
    })
    nameHandle.appendChild(ol);
}
function showData() {
    axios.get(url).then((employee,) => {
         employees = employee.data
        employees.forEach(emp => {
            getEmployee(emp);
            let option = document.createElement('option')
            option.setAttribute('value', emp._id);
            option.innerHTML = emp.mobileNumbers;
            employeeHandle.appendChild(option);

            let option1 = document.createElement('option')
            option1.setAttribute('value', emp._id);
            option.innerHTML = emp.name;

        })
    countHandle.innerHTML = employees.length;
    })
}


formHandle.addEventListener('submit', (e) => {
    let formData = {
        // name:employeeHandle.value,
        numType: numTypeHandle.value,
        mobileNumber: numberHandle.value
    }
    e.preventDefault();
    axios.post(`http://localhost:3000/employee/${employeeHandle.value}/mobile_numbers`, formData)
        .then(function (response) {
            let employee = response.data;
            getEmployee(employee);
            showData();
        })
        .catch(function (err) {
            console.log(err);
        })
}, false)

window.addEventListener('load', function () {
    showData();
}, false)