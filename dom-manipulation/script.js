// Array of quote objects
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
    { text: "Believe you can and you're halfway there.", category: "Belief" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Time" },
    { text: "It always seems impossible until it’s done.", category: "Inspiration" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Selects a random index
    const randomQuote = quotes[randomIndex]; // Get the random quote

    const quoteDisplay = document.getElementById('quoteDisplay'); // Get the div to display the quote

    // Set the HTML content of the quoteDisplay div
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}

// Function to create the "Add Quote" form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement('div'); // Create a new div for the form container

    // Create the input field for the new quote text
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';

    // Create the input field for the new quote category
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';

    // Create the button to add the new quote
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote; // Link the button to the addQuote function

    // Append the inputs and button to the form container
    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addButton);

    // Append the form container to the body or a specific section of the page
    document.body.appendChild(formContainer);
}

// Function to add the new quote to the quotes array
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
        // Create a new quote object
        const newQuote = { text: newQuoteText, category: newQuoteCategory };

        // Add the new quote to the quotes array
        quotes.push(newQuote);

        // Display the new quote
        showRandomQuote();

        // Clear the input fields after adding the quote
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // show a success message
        alert("New quote added successfully!");
    } else {
        // Show an error message if fields are empty
        alert("Please fill in both fields.");
    }
}

// Step 4: Initialize the app
window.onload = function() {
    // Display a random quote when the page loads
    showRandomQuote();

    // Create the "Add Quote" form 
    createAddQuoteForm();

    // Attach event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }
};