$(document).ready(readyNow);
let totalAnnual = 0


function readyNow() {
    // listener for submitting data from form
    $('.submit-button').on('click', submitEmployee);
    // add listeners to delete buttons
    $('.employee-list').on('click', '.delete-cell', deleteEmployee);
    // add listener to expand button
    $('main').on('click', '#expand', hideIntro);
}

// toggles the buttons to show/hide, as well as the welcome letter
function hideIntro() {
    $('#intro').toggleClass('hide');
    // used two different button instead of changing the text on the button every time
    $('#welcome-dot').toggleClass('hide');
    $('#welcome').toggleClass('hide');
}

// take input from text boxes and add them to the table in the DOM
function submitEmployee(event) {
    // don't refresh page on submit
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
        // add employee anual salary to the anual total 
        totalAnnual += salaryNum;
        // show new monthly total
        updateTotal();
        // remove all values from input fields
        $('.employee-data').val('');
    }
}

// find out if all input fields have data in them
function fieldsFull(employee) {
    // loop through employee object
    for (const val in employee) {
        if (!employee[val]) {
            $('.submit').fadeIn(100);
            return false;
        }
    }
    $('.submit').fadeOut(100);
    return true;
}

// check if user has entered a decimal point
function noDecimals(employee) {
    // look for postition of period. If none, will return -1
    if (employee.salary.indexOf('.') !== -1) {
        // pull up flag to alert user of problem
        $('.decimal').fadeIn(100);
        return false;
    }
    // if no problem, make sure to remove flag
    $('.decimal').fadeOut(100);
    return true;
}

function deleteEmployee() {
    // find the current row we are in first by looking for the closest tr
    let currentRow = $(this.closest('tr'));
    // look inside the row for the salary cell by using .find, and save the content as the salary
    let salary = $(currentRow).find('.employee-salary').html();
    // remove all non-numbers from the salary and save just the number value
    let salaryNum = Number(salary.replace(/\D/g, ''));
    // subtract anual salary of that employee fromn the anual total
    totalAnnual -= salaryNum;
    // display new total
    updateTotal();
    // remove the table row that the delete button sits in
    $(this.closest('tr')).remove();
}

function updateTotal() {
    // change the content of monthly total to be the total anual
    // salary divided by 12 months
    $('.monthly-total').text(`Total Monthly: $${Math.round(totalAnnual / 12)}`);
    // if monthly costs are higher than 20k, change background to red 
    if (totalAnnual / 12 > 20000) {
        $('.monthly-total').addClass('red');
    } else {
        // if 20k or lower, green background can remain
        $('.monthly-total').removeClass('red');
    }
}