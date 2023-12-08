// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addAttendeeForm = document.getElementById('new-attendee-form');
    console.log(addAttendeeForm);

    // Modify the objects we need
    addAttendeeForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newName = document.getElementById("name");
        let newEmail = document.getElementById("email");
        let newPhone = document.getElementById("phone");

        // Get the values from the form fields
        let nameValue = newName.value;
        let emailValue = newEmail.value;
        let phoneValue = newPhone.value;

        // Put our data we want to send in a javascript object
        let data = {
            name: nameValue,
            email: emailValue,
            phone: phoneValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/attendees/new-attendee/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful insertion
            alert("Attendee added successfully!");
            window.location.href = '/attendees';
        } else {
            // Handle errors
            const error = await response.json();

            // Init regex object
            let regex = {
                'email': /Duplicate entry .* for key 'attendee_email'/,
                'phone': /Duplicate entry .* for key 'attendee_phone'/
            }

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                if (regex.email.test(error.sqlMessage)) {
                    alert(`The email ${data.email} has already been used to register!`)
                } else if (regex.phone.test(error.sqlMessage)) {
                    alert(`The phone number ${data.phone} has already been used to register!`)
                }
            };

            // Send generic error message
            console.error("Error adding attendee");
        }
    });
});
