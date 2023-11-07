// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addCompetitorForm = document.getElementById('new-competitor-form-ajax');
    console.log(addCompetitorForm);

    // Modify the objects we need
    addCompetitorForm.addEventListener("submit", function (e) {
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
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-competitor-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newName.value = '';
                newEmail.value = '';
                newPhone.value = '';
                
                // Redirect to the competitor page
                window.location.href ='/competitors';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});