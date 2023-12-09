// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketSale = document.getElementById('edit-ticket-sale-form');
    console.log(editTicketSale);

    // Modify the objects we need
    editTicketSale.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();
        
        // Get data from form fields
        const data = getFormFields();
        
        try {
            // Fetch response from put request
            const response = await fetch('/ticket-sales/edit-ticket-sale/fetch', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            // Check for http errors 
            if (!response.ok) {
                // Append generic server error message to DOM tree
                let errorMsg = document.getElementById("error-msg");
                errorMsg.textContent = `Error inserting ticket sale: ${response.status} ${response.statusText}`;
                
                // Notify user of error with failure popup
                failurePopup();
            }

            // Notify user of success with success popup
            successPopup();
        } catch (error) {
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
    let updateID = document.getElementById("id")
    let newAttendeeId = document.getElementById("attendee");
    let newTicketId = document.getElementById("ticket");
    let newDiscountId = document.getElementById("discount");

    // Get the values from the form fields
    let ticketID = updateID.value;
    let attendeeIdValue = newAttendeeId.value;
    let ticketIdValue = newTicketId.value;
    let discountIdValue = newDiscountId.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: ticketID,
        attendeeId: attendeeIdValue,
        ticketId: ticketIdValue,
        discountId: discountIdValue
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
        window.location.href = '/ticket-sales';
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