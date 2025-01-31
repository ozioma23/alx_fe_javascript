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

        // Check for conflicts by comparing the quote with existing ones
        const existingQuoteIndex = quotes.findIndex(q => q.text === newQuote.text);

        if (existingQuoteIndex === -1) {
            // If no conflict (new quote), add it to the quotes array
            quotes.push(newQuote);
            saveQuotesToLocalStorage(); // Save updated quotes to local storage
            showRandomQuote(); // Optionally, display the new quote immediately
            showNotification("New quote added successfully!", "success");
        } else {
            // If there is a conflict (duplicate quote), notify the user
            const userResponse = confirm("This quote already exists. Do you want to overwrite it?");
            if (userResponse) {
                // If user agrees, overwrite the quote
                quotes[existingQuoteIndex] = newQuote;
                saveQuotesToLocalStorage();
                showRandomQuote(); // Optionally, display the updated quote
                showNotification("Quote updated successfully!", "success");
            } else {
                showNotification("Conflict resolved: Quote not added.", "info");
            }
        }

        // Clear the input fields after adding the quote
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // show a success message
        alert("New quote added successfully!");

        // Re-populate categories after adding a new quote
        populateCategories();
        
        // Check if the new category is in the dropdown, if not, add it
        const categoryFilter = document.getElementById('categoryFilter'); // Get the category filter dropdown
        if (categoryFilter) {
            let categoryExists = false;
            for (let i = 0; i < categoryFilter.options.length; i++) {
                if (categoryFilter.options[i].value === newQuoteCategory) {
                    categoryExists = true;
                    break;
                }
            }

            // If the category does not exist, add it to the dropdown
            if (!categoryExists) {
                const option = document.createElement('option');
                option.value = newQuoteCategory;
                option.textContent = newQuoteCategory;
                categoryFilter.appendChild(option);
            }
        }
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
                populateCategories(); // Re-populate categories after import
            } else {
                alert('The uploaded file is not a valid quotes JSON file.');
            }
        } catch (error) {
            alert('Error parsing the JSON file. Please ensure it is a valid JSON file.');
        }
    };
    
    fileReader.readAsText(event.target.files[0]); // Read the file as text
}

// Function to populate categories dynamically in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter'); // Get the category filter dropdown
    
    // Get unique categories from the quotes array
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Create an array of unique categories

    // Add the "All Categories" option first
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add the unique categories as options in the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option); // Add option to the dropdown
    });

    const categoriesSet = new Set(); // Create a set to store unique categories

    // Iterate over the quotes array and add categories to the set
    quotes.forEach(quote => categoriesSet.add(quote.category));

    const categorySelect = document.createElement('select'); // Create the select dropdown

    // Add an option to select "All Categories"
    const allCategoriesOption = document.createElement('option');
    allCategoriesOption.value = "All";
    allCategoriesOption.textContent = "All Categories";
    categorySelect.appendChild(allCategoriesOption);

    // Create options for each unique category
    categoriesSet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Append the category select dropdown to the body or a specific section of the page
    const categoryContainer = document.getElementById('categoryContainer');
    if (categoryContainer) {
        categoryContainer.appendChild(categorySelect);

        // Restore last selected category from localStorage if available
        const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
        if (lastSelectedCategory) {
            categorySelect.value = lastSelectedCategory;
        }

        // Add an event listener to filter quotes when a category is selected
        categorySelect.addEventListener('change', filterQuotes);
    }
}
// Function to display a notification
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notificationContainer');
    
    // If notification container doesn't exist, create it
    if (!notificationContainer) {
        const newContainer = document.createElement('div');
        newContainer.id = 'notificationContainer';
        document.body.appendChild(newContainer);
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const notificationContainerElement = document.getElementById('notificationContainer');
    notificationContainerElement.appendChild(notification);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.querySelector('select').value; // Get the selected category

    // Save the selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);

    // Filter the quotes based on the selected category
    let filteredQuotes = quotes;
    if (selectedCategory !== "All") {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    // Display a random quote from the filtered list
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        displayQuote(randomQuote);
    } else {
        // If no quotes match, display a message indicating no quotes found
        const quoteDisplay = document.getElementById('quoteDisplay');
        if (quoteDisplay) {
            quoteDisplay.innerHTML = `<p>No quotes found for the selected category.</p>`;
        }
    }
}

// Function to display a quote (either random or filtered)
function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
        quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
    }
}
// Simulate server interaction (fetch and post data)

// Fetch random quote from a simulated server (JSONPlaceholder or similar)
function fetchQuoteFromServer() {
    // Simulating a delay in fetching data from the server
    setTimeout(() => {
        // Simulate fetching a new quote from an external API (e.g., JSONPlaceholder)
        const simulatedQuote = { text: "New quote fetched from server.", category: "Server" };
        
          // Check for conflicts by comparing the quote with existing ones
          const existingQuoteIndex = quotes.findIndex(q => q.text === simulatedQuote.text);

          if (existingQuoteIndex === -1) { 
              // If no conflict (new quote), add it to the quotes array
              quotes.push(simulatedQuote);
          } else {
              // If there is a conflict (duplicate quote), prioritize the server's data
              quotes[existingQuoteIndex] = simulatedQuote;
          }
// Save updated quotes to local storage
        saveQuotesToLocalStorage();
        showRandomQuote();
    }, 2000); // Delay of 2 seconds for fetching
}

// Periodic data fetching simulation
setInterval(fetchQuoteFromServer, 10000); // Fetch new quote every 10 seconds


// Initialize the app
window.onload = function() {
    // Display a random quote when the page loads
    showRandomQuote();

    // Create the "Add Quote" form 
    createAddQuoteForm();


      // Populate categories in the dropdown
      populateCategories();


    // Attach event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }
     // Start periodic server syncing
     setInterval(fetchQuoteFromServer, 10000); // Fetch new quote every 10 seconds
};