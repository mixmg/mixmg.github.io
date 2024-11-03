function showLoading(loading, results) {
    loading.style.display = 'block'; 
    results.classList.add('hidden'); 
}

function hideLoading(loading, results) {
    loading.style.display = 'none'; 
    results.classList.remove('hidden'); 
}
