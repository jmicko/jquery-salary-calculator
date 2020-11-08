console.log('ready');

$(document).ready(readyNow);
let totalAnnual = 0


function readyNow() {
    console.log('jQuery connected');
    $('.submit-button').on('click', submitEmployee);
    $('main').append(`<h2 id='monthly-total'>Total Monthly: $${totalAnnual}</h2>`);
    $('.employee-list').on('click', '.delete-cell', deleteEmployee);
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
        salary: $('#in-annual-salary').val(),
    };

    // find out if all input fields have data in them
    function fieldsFull() {
        // loop through employee object
        for (const val in employee) {
            console.log(`value of the key is:`, employee[val]);
            if (!employee[val]) {
                console.log(`it's false`, employee[val]);
                return false;
            }
        }
        return true;
    }

    if (fieldsFull()) {
        console.log('there is an employee', employee);
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
        let salaryNum = Number(employee.salary.replace(/\D/g,''));
        totalAnnual += salaryNum;
        $('#monthly-total').text(`Total Monthly: $${totalAnnual/12}`);
        console.log(salaryNum, employee.salary);
    }
}

function deleteEmployee() {
    // find the current row we are in first by looking for the closest tr
    let currentRow = $(this.closest('tr'));
    // look inside the row for the salary cell by using .find, and save the content as the salary
    let salary = $(currentRow).find('.employee-salary').html();
    // remove all non-numbers from the salary and save just the number value
    let salaryNum = Number(salary.replace(/\D/g,''));
    // subtract anual 
    totalAnnual -= salaryNum;
    $('#monthly-total').text(`Total Monthly: $${totalAnnual/12}`);
    $(this.closest('tr')).remove();
}