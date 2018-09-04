let url = 'http://localhost:3000/employee';

let nameHandle = document.getElementById('name');

let dataHandle = document.getElementById('data');
let employeeHandle = document.getElementById('employee')
let formHandle = document.getElementById('addContact')
let numTypeHandle = document.getElementById('numType');
let numberHandle = document.getElementById('number')
let countHandle = document.getElementById('count')
let employees;
function del(obj) {
    axios.delete(`http://localhost:3000/employee/${obj.name}/mobile_numbers/${obj.id}`)
        var listItems = document.getElementsByTagName('li');
        for(var i=0;i<listItems.length;i++) {
           listItems[i].onclick = function() {this.parentNode.removeChild(this)}
        }
}


function build(id, employee) {
    let find = document.getElementsByTagName('ol');
  console.log(find);
    let li = document.createElement('li');
    li.innerHTML = ` ${employee.numType} ${employee.mobileNumber}`

    // olHandle1.appendChild(li);

}


function getEmployee(emp) {

    let h2Tag = document.createElement('h2');
    h2Tag.innerHTML = emp.name
    nameHandle.appendChild(h2Tag)

  let ol = document.createElement('ol');
    ol.setAttribute('id', emp._id)
    // console.log(ol);
//    let olHandle  = document.getElementById(emp._id);
//    console.log(olHandle)
    // olHandle = document.getElementById(emp._id);
    emp.mobileNumbers.forEach(employee => {
        let employeeId = emp._id;
        let li = document.createElement('li');
        li.innerHTML = `${employee.numType} ${employee.mobileNumber} <input type = "button" value="Remove" name ="${employeeId}"  id="${employee._id}" onclick="del(this)"/>`;
        ol.appendChild(li)
    })
    nameHandle.appendChild(ol)
    let olHandle  = document.getElementById(emp._id);
}

function showData() {
    axios.get(url).then((employee, ) => {
        employees = employee.data
        employees.forEach(emp => {
            getEmployee(emp);
            let option = document.createElement('option')
            option.setAttribute('value', emp._id);
            option.innerHTML = emp.name;
            // option.innerHTML = emp.mobileNumbers;
            employeeHandle.appendChild(option);

            let option1 = document.createElement('option')
            option1.setAttribute('value', emp._id);


        })
        countHandle.innerHTML = employees.length;
    })
}


formHandle.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        // name:employeeHandle.value,
        numType: numTypeHandle.value,
        mobileNumber: numberHandle.value
    }
    axios.post(`http://localhost:3000/employee/${employeeHandle.value}/mobile_numbers`, formData)
        .then(function (response) {
            let employee = response.data;
            build(employeeHandle.value,employee.newMobile);
        
        })
        .catch(function (err) {
            console.log(err);
        })
}, false)

window.addEventListener('load', function () {
    showData();
}, false)