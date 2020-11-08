console.log('ready');

$(document).ready(readyNow);
let totalAnnual = 0


function readyNow() {
    console.log('jQuery connected');
    $('.submit-button').on('click', submitEmployee);
    printTotal()
    $('.employee-list').on('click', '.delete-cell', deleteEmployee);
}

function printTotal() {
    $('main').append(`<h2 class='shadow monthly-total'>Total Monthly: $${totalAnnual}</h2>`);
}


// take input from text boxes and add them to the table in the DOM
function submitEmployee(event) {
    event.preventDefault();

    // grab values from all input boxes and store them in an employee object
    let employee = {
        firstName: $('#in-first-name').val(),
        lastName: $('#in-last-name').val(),
        id: $('#in-id').val(),
        title: $('#in-title').val(),
        salary: $('#in-annual-salary').val()
    };
    // check to make sure all fields are filled and there are no decimals in the salary field
    // as it can make for bad calculations in js
    // used single & here so any error flags will update if they have been fixed
    if (fieldsFull(employee) & noDecimals(employee)) {
        console.log('there is an employee', employee);
        // add a row to the table with the new employee information and a delete button
        $('.employee-list').append(
            `<tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td class='employee-salary'>$${employee.salary}</td>
                <td class='delete-cell'><button class='delete-button'>Terminate</button></td>
            </tr>`
        );
        // change the salary string to a number so we can just add it to the total /\D/g,'' searches for all non-numbers 
        // and replaces them with empty string
        let salaryNum = Number(employee.salary.replace(/\D/g, ''));
        totalAnnual += salaryNum;
        updateTotal();
        console.log(salaryNum, employee.salary);
    }
}

// find out if all input fields have data in them
function fieldsFull(employee) {
    // loop through employee object
    for (const val in employee) {
        if (!employee[val]) {
            console.log(`it's false`, employee[val]);
            flagError();
            return false;
        }
    }
    $('.submit').fadeOut(100);

    return true;
}


function noDecimals(employee) {
    if (employee.salary.indexOf('.') !== -1) {
        flagDecimals();
        console.log(`can't do that`);
        return false;
    }
    $('.decimal').fadeOut(100);

    return true;
}

function flagDecimals(){
        $('.decimal').fadeIn(100);
        $('.decimal').show(500);
}

function flagError(){
        $('.submit').fadeIn(100);
        $('.submit').show(500);
}

function deleteEmployee() {
    // find the current row we are in first by looking for the closest tr
    let currentRow = $(this.closest('tr'));
    // look inside the row for the salary cell by using .find, and save the content as the salary
    let salary = $(currentRow).find('.employee-salary').html();
    // remove all non-numbers from the salary and save just the number value
    let salaryNum = Number(salary.replace(/\D/g, ''));
    // subtract anual 
    totalAnnual -= salaryNum;
    updateTotal();
    $(this.closest('tr')).remove();
}

function updateTotal() {
    console.log(totalAnnual);
    $('.monthly-total').text(`Total Monthly: $${Math.round(totalAnnual / 12)}`);
    if (totalAnnual / 12 > 20000) {
        $('.monthly-total').addClass('red');
    } else {
        $('.monthly-total').removeClass('red');
    }
}