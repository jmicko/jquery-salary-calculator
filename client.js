console.log('ready');

$(document).ready(readyNow);
let totalMonthly = 0

function readyNow() {
    console.log('jQuery connected');
    $('.submit-button').on('click', submitEmployee);
    $('main').append(`<h2 id='monthly-total'>Total Monthly: $${totalMonthly}</h2>`)

}



function submitEmployee(event) {
    event.preventDefault();
    let employee = {
        firstName: $('#in-first-name').val(),
        lastName: $('#in-last-name').val(),
        id: $('#in-id').val(),
        title: $('#in-title').val(),
        salary: $('#in-annual-salary').val(),
    };
    
    $('.employee-list').append(
    `<tr>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.id}</td>
        <td>${employee.title}</td>
        <td>$${employee.salary}</td>
        <td class='delete-cell'><button class='delete-button'>Terminate</button></td>
    </tr>`
    );
    // change the salary string to a number so we can just add it to the total
    let salaryNum = Number(employee.salary.replace(',', ''));
    totalMonthly += salaryNum;
    $('#monthly-total').text(`Total Monthly: $${totalMonthly}`);
    console.log(salaryNum, employee.salary);
}