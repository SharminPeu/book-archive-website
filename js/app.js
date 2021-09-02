document.getElementById('error-message').style.display = 'none';
// Search area 
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // clear search field 
    searchField.value = "";

    // Handle empty search request
    if (searchText === '') {
        displayError();
    }
    // load data 
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}
// error handling function 
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('search-result').textContent = '';
    document.getElementById('book-numbers').textContent = '';

}
// Display search result 
const displaySearchResult = books => {
    console.log(books)
    const searchResult = document.getElementById('search-result')
    document.getElementById('error-message').style.display = 'none';
    const bookList = books.docs;

    if (bookList.length === 0) {
        displayError();
    }
    // console.log(books)
    else {
        document.getElementById('book-numbers').innerText = `Total Books Found ${books.numFound}`;
        searchResult.textContent = ''
        bookList.forEach(book => {
            // console.log(book)
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
        <div class="card h-100">
     <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="250px">
        <div class="card-body">
          <h5 class="card-title fw-bold">Book Name: ${book.title}</h5>
          <p class="card-text">1st Publihed year: <span class="fw-bold">${book.first_publish_year}</span></p>
          <p class="card-text">Publisher:<span class="fw-bold"> ${book.publisher}<span></p>
        <p class="card-text ">Author Name:<span class="text-danger fw-bolder"> ${book.author_name}</span></p>
      </div>`
            searchResult.appendChild(div)
        });
    }
}

