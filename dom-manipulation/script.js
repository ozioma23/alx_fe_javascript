// Array of quote objects
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
    { text: "Believe you can and you're halfway there.", category: "Belief" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Time" },
    { text: "It always seems impossible until it’s done.", category: "Inspiration" },
];


// Implement functions to (display) a random quote 
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Selects a random index
    const randomQuote = quotes[randomIndex]; // Get the random quote

    const quoteDisplay = document.getElementById('quoteDisplay'); // Get the div to display the quote


 // Set the HTML content of the quoteDisplay div
 quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}

// Function to add a new quote.
function addQuote() {
    // Get the values from the input fields
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

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

    // Optionally, show a success message
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


     // Attach event listener to the "Show New Quote" button
     document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    };
