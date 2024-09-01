// loading.js

function showLoading(loading, results) {
    loading.style.display = 'block'; // Show the loading spinner
    results.classList.add('hidden'); // Hide the results
}

function hideLoading(loading, results) {
    loading.style.display = 'none'; // Hide the loading spinner
    results.classList.remove('hidden'); // Show the results
}

// Export functions to be used in other scripts (if using a module system)
