let myLibrary = [];
// some initial book-cards
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 250, false));
myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1000, true));

//inputs for book addition
const bookAddition = document.getElementById('book-addition');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages-number');
const read = document.getElementById('read-yes');

//buttons
const addBookButton = document.getElementById('add-book');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const closeButton = document.getElementById('close');

//book cards wrapper
const bookCards = document.getElementById('book-cards');

//add book button
addBookButton.addEventListener('click', (e) => bookAddition.showModal());

//clear form button
clearButton.addEventListener('click', (e) => {
  clearInputs();
});

//save form button
saveButton.addEventListener('click', (e) => {
  addBookToLibrary();
  clearInputs();
  bookAddition.close();
});

//close form button
closeButton.addEventListener('click', (e) => {
  clearInputs();
  bookAddition.close();
});

//clear inputs
function clearInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = true;
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
  showLibrary();
}

function showLibrary() {
  bookCards.innerHTML = '';
  myLibrary.toReversed().forEach((book) => {
    addBookCard(book);
  });
}

function markBookAsRead(e, book) {
  const bookIndex = myLibrary.findIndex((bookArray) => bookArray === book);
  myLibrary[bookIndex].read = true;
  if (e) showLibrary();
}

function deleteBook(e, book) {
  myLibrary = myLibrary.filter((bookArray) => bookArray !== book);
  if (e) showLibrary();
}

function addBookCard(book) {
  const newBookCard = document.createElement('div');
  newBookCard.classList.add('book-card');

  const newBookTitle = document.createElement('p');
  newBookTitle.classList.add('book-title');
  newBookTitle.innerText = book.title;
  
  const newBookAuthor = document.createElement('p');
  newBookAuthor.classList.add('book-author');
  newBookAuthor.innerText = `by ${book.author}`;

  const newBookPages = document.createElement('p');
  newBookPages.classList.add('book-pages');
  newBookPages.innerText = `${book.pages} pages`;

  const newBookRead = document.createElement('p');
  newBookRead.classList.add('book-read');
  newBookRead.innerText = `Read? ${book.read ? 'Yes' : 'No'}`;

  const newBookButtons = document.createElement('div');
  newBookButtons.classList.add('book-card-buttons');
  
  const newBookMarkRead = document.createElement('button');
  newBookMarkRead.classList.add('book-read-button');
  newBookMarkRead.innerText = 'Mark as Read';
  newBookMarkRead.addEventListener('click', function(e) {
    markBookAsRead(e, book)
  });

  const newBookDelete = document.createElement('button');
  newBookDelete.classList.add('book-delete-button');
  newBookDelete.innerText = 'Delete';
  newBookDelete.addEventListener('click', function(e) {
    deleteBook(e, book)
  });

  newBookButtons.appendChild(newBookMarkRead);
  newBookButtons.appendChild(newBookDelete);

  newBookCard.appendChild(newBookTitle);
  newBookCard.appendChild(newBookAuthor);
  newBookCard.appendChild(newBookPages);
  newBookCard.appendChild(newBookRead);
  newBookCard.appendChild(newBookButtons);

  bookCards.appendChild(newBookCard);
}

showLibrary();