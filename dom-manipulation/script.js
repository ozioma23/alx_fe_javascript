// Array of quote objects
const defaultQuotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
    { text: "Believe you can and you're halfway there.", category: "Belief" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Time" },
    { text: "It always seems impossible until it’s done.", category: "Inspiration" },
];

const quotes = JSON.parse(localStorage.getItem('quotes')) || defaultQuotes;

// Function to save quotes to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Selects a random index
    const randomQuote = quotes[randomIndex]; // Get the random quote

    const quoteDisplay = document.getElementById('quoteDisplay'); // Get the div to display the quote

    // Set the HTML content of the quoteDisplay div
    if (quoteDisplay) {
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}

// Store the last viewed quote in session storage
sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
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

// Function to add the new quote to the array
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
        // Create a new quote object
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        saveQuotesToLocalStorage(); // Save updated quotes to local storage

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

// Function to export quotes as a JSON file
function exportQuotesAsJSON() {
    const jsonData = JSON.stringify(quotes, null, 2); // Convert the quotes array to a JSON string
    
    const blob = new Blob([jsonData], { type: 'application/json' }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Create a download link URL
    
    const link = document.createElement('a'); // Create an anchor element (link)
    link.href = url; // Set the link's href to the Blob URL
    link.download = 'quotes.json'; // Set the download file name
    link.click(); // Trigger the download by simulating a click
    
    // Clean up the object URL
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result); // Parse the uploaded JSON file
            
            // Validate the structure of the imported data (ensure it's an array of quotes)
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes); // Add imported quotes to the current quotes array
                saveQuotes(); // Save updated quotes to local storage
                showRandomQuote(); // Optionally, display a random quote after import
                
                alert('Quotes imported successfully!');
            } else {
                alert('The uploaded file is not a valid quotes JSON file.');
            }
        } catch (error) {
            alert('Error parsing the JSON file. Please ensure it is a valid JSON file.');
        }
    };
    
    fileReader.readAsText(event.target.files[0]); // Read the file as text
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