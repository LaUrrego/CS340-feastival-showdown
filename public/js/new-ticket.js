// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTicketForm = document.getElementById('new-ticket-form');
    console.log(addTicketForm);

    // Modify the objects we need
    addTicketForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields();

        try {
            // Fetch response from post request
            const response = await fetch('/tickets/new-ticket/fetch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            // Check for http/sql errors
            if (!response.ok) {
                // Handle errors
                const error = await response.json();

                // Fetch ticket type and event year
                const ticketTypeResponse = await fetch(`/ticket-types/get-ticket-type?id=${data.ticketTypeId}`);
                const eventYearResponse = await fetch(`/event-years/get-event-year?id=${data.eventYearId}`);

                // Get JSON from response
                const ticketType = await ticketTypeResponse.json();
                const eventYear = await eventYearResponse.json();

                // Handle specific errors
                let errorMsg = document.getElementById("error-msg");
                if (error.sqlError == 1062) {
                    errorMsg.textContent = `A ${ticketType.ticket_type.toLowerCase()} ticket is already on sale for ${eventYear.year}!`;
                };

                // Notify user of error with failure popup
                failurePopup();
            } else {
                // Notify user of success with success popup
                successPopup();
            }
        } catch(error) {
            // Append fetch network error to DOM tree
            let errorMsg = document.getElementById("error-msg");
            errorMsg.textContent = error;
            console.log(error);

            // Notify user of error with failure popup
            failurePopup();
        }
    })
});

/**
 * Gets html form fields and returns object containing all information
 * @returns JSON object with form fields
 */
function getFormFields() {

    // Get form fields we need to get data from
    let newPrice = document.getElementById("price");
    let newTicketTypeId = document.getElementById("ticket-type");
    let newEventYearId = document.getElementById("year");

    // Get the values from the form fields
    let priceValue = newPrice.value;
    let ticketTypeIdValue = newTicketTypeId.value;
    let eventYearIdValue = newEventYearId.value;

    // Put our data we want to send in a javascript object
    let data = {
        price: priceValue,
        ticketTypeId: ticketTypeIdValue,
        eventYearId: eventYearIdValue
    }

    // Log and return data
    console.log("this is data:", data)
    return data
};

function successPopup() {
    // Get correct popup and open it
    let popup = document.getElementById("success-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close and redirect on click
    let button = document.getElementById("success-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
        window.location.href = '/tickets';
    });
};

function failurePopup() {
    // Get correct popup and open it
    let popup = document.getElementById("failure-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close on click
    let button = document.getElementById("failure-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
    });
};