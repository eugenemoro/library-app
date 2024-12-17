class Book {
  #title;
  #author;
  #pages;
  #read;

  constructor(title, author, pages, read) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
  }
  
  get title() {
    return this.#title;
  }
  get author() {
    return this.#author;
  }
  get pages() {
    return this.#pages;
  }
  get read() {
    return this.#read;
  }

  set title(value) {
    this.#title = value;
  }
  set author(value) {
    this.#author = value;
  }
  set pages(value) {
    this.#pages = value;
  }
  set read(value) {
    this.#read = value;
  }
}

class DisplayController {
  //inputs for book addition
  static bookAddition = document.getElementById('book-addition');
  static title = document.getElementById('title');
  static author = document.getElementById('author');
  static pages = document.getElementById('pages-number');
  static read = document.getElementById('read-yes');

  //buttons
  static addBookButton = document.getElementById('add-book');
  static saveButton = document.getElementById('save');
  static clearButton = document.getElementById('clear');
  static closeButton = document.getElementById('close');

  //book cards wrapper
  static bookCards = document.getElementById('book-cards');

  static inintialize() {
    //add book button
    this.addBookButton.addEventListener('click', (e) => this.bookAddition.showModal());

    //clear form button
    this.clearButton.addEventListener('click', (e) => {
      this.clearInputs();
    });

    //form submit
    this.bookAddition.addEventListener('submit', (e) => {
      LibraryController.addBookToLibrary(this.title.value, this.author.value, this.pages.value, this.read.checked);
      this.clearInputs();
      this.bookAddition.close();
      e.preventDefault();
    });

    //close form button
    this.closeButton.addEventListener('click', (e) => {
      this.clearInputs();
      this.bookAddition.close();
    });

    this.showLibrary();
  }

  //clear inputs
  static clearInputs() {
    this.title.value = '';
    this.author.value = '';
    this.pages.value = '';
    this.read.checked = true;
  }

  static showLibrary() {
    this.bookCards.innerHTML = '';
    LibraryController.myLibrary.toReversed().forEach((book) => {
      this.addBookCard(book);
    });
  }

  static displayBookCard(bookCard) {
    this.bookCards.appendChild(bookCard);
  }

  static addBookCard(book) {
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
      LibraryController.markBookAsRead(e, book)
    });
  
    const newBookDelete = document.createElement('button');
    newBookDelete.classList.add('book-delete-button');
    newBookDelete.innerText = 'Delete';
    newBookDelete.addEventListener('click', function(e) {
      LibraryController.deleteBook(e, book)
    });
  
    newBookButtons.appendChild(newBookMarkRead);
    newBookButtons.appendChild(newBookDelete);
  
    newBookCard.appendChild(newBookTitle);
    newBookCard.appendChild(newBookAuthor);
    newBookCard.appendChild(newBookPages);
    newBookCard.appendChild(newBookRead);
    newBookCard.appendChild(newBookButtons);
  
    this.displayBookCard(newBookCard);
  }
}

class LibraryController {
  static myLibrary = [];
  // some initial book-cards
  static inintialize() {
    this.myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 250, false));
    this.myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1000, true));
  }

  static addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.myLibrary.push(newBook);
    DisplayController.showLibrary();
  }
  
  static markBookAsRead(e, book) {
    const bookIndex = this.myLibrary.findIndex((bookArray) => bookArray === book);
    this.myLibrary[bookIndex].read = true;
    if (e) DisplayController.showLibrary();
  }
  
  static deleteBook(e, book) {
    this.myLibrary = this.myLibrary.filter((bookArray) => bookArray !== book);
    if (e) DisplayController.showLibrary();
  }

  static get myLibrary() {
    return this.myLibrary;
  }
}

LibraryController.inintialize();
DisplayController.inintialize();
