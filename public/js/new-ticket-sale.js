// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addRatingForm = document.getElementById('new-ticket-sale-form-ajax');
    console.log(addRatingForm);

    // Modify the objects we need
    addRatingForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newAttendee = document.getElementById("attendee");
        let newTicketType = document.getElementById("ticket-type");
        let newTotal = document.getElementById("total");
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let attendeeValue = newAttendee.value;
        let ticketTypeValue = newTicketType.value;
        let totalValue = newTotal.value;
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            attendee: attendeeValue,
            ticketType: ticketTypeValue,
            total: totalValue,
            year: yearValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-ticket-sale-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newAttendee.value = '';
                newTicketType.value = '';
                newTotal.value = '';
                newYear.value = '';

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});