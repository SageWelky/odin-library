let libraryArray = [];
let i = 0;
let isbn = 0;

function addBooktoLibraryArray(addedBook) {
  libraryArray.push(addedBook);
  updateShelfRender();
}


let addBookButton = document.getElementById("add-book-button");
let cancelAddBook = document.getElementById("cancel-add-book");
let addBookDialog = document.getElementById("add-book-dialog");
let libraryShelf = document.getElementById("library-shelf");
let bookForm = document.getElementById("add-book-form");

addBookButton.addEventListener( "click", () => {

  addBookDialog.showModal();

});
cancelAddBook.addEventListener( "click", () => {

  addBookDialog.close();

});
addBookDialog.addEventListener( "submit", (event) => {

  isbn++
  let addedBookReadBool = (document.getElementById("book-status").value === "Read" ) ? true : false;
  let addedBook = new Book(document.getElementById("book-title").value, document.getElementById("book-author").value, parseInt(document.getElementById("book-pages").value), addedBookReadBool);
  addBooktoLibraryArray(addedBook);
  bookForm.reset();

});




function Book(title, author, pages, readBool) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBool = readBool;
}

Book.prototype.info = function info() {
  return `${title} by ${author}, ${pages} pages, ${readBool ? "has been read" : "not read yet"}.`;
}
Book.prototype.toggleReadBool = function toggleReadBool( event, bookStatusInstance ) {
  this.readBool = !(this.readBool);
  event.target.textContent = this.readBool ? "Mark Unread" : "Mark Read";
  bookStatusInstance.textContent = this.readBool ? "Read" : "Unread";
}


function updateShelfRender() {

  let divs = [];
  let bookContainer;

  for ( i; i < ( libraryArray.length ); i++ ) {

    divs[i] = bookContainer;

    bookContainer = document.createElement( "div" );
    bookContainer.setAttribute("class", "book-container");
    bookContainer.setAttribute( "id", `book-${isbn.toString()}` );

    infoContainer = document.createElement( "div" );
    infoContainer.setAttribute("class", "info-container");

    buttonContainer = document.createElement( "div" );
    buttonContainer.setAttribute("class", "button-container");

    bookTitle = document.createElement( "span" );
    bookTitle.textContent = libraryArray[i].title;
    bookAuthor = document.createElement( "span" );
    bookAuthor.textContent = libraryArray[i].author;
    bookPages = document.createElement( "span" );
    bookPages.textContent = libraryArray[i].pages;
    bookStatus = document.createElement( "span" );
    bookStatus.textContent = libraryArray[i].readBool ? "Read" : "Unread";

    statusUpdateButton = document.createElement( "button" );
    statusUpdateButton.textContent = libraryArray[i].readBool ? "Mark Unread" : "Mark Read";
    statusUpdateButton.setAttribute( "id", `toggle-read-button-${isbn.toString()}` );
    statusUpdateButton.setAttribute( "class", "shelf-button" );

    bindEvent(libraryArray[i], statusUpdateButton, bookStatus);

    removeBookButton = document.createElement( "button" );
    removeBookButton.textContent = "Remove Book";
    removeBookButton.setAttribute( "id", `toggle-read-button-${isbn.toString()}` );
    removeBookButton.setAttribute( "class", "shelf-button" );



    infoContainer.appendChild( bookTitle );
    infoContainer.appendChild( bookAuthor );
    infoContainer.appendChild( bookPages );
    infoContainer.appendChild( bookStatus );

    bookContainer.appendChild( infoContainer );

    buttonContainer.appendChild( statusUpdateButton );
    buttonContainer.appendChild( removeBookButton );

    bookContainer.appendChild( buttonContainer );

    libraryShelf.appendChild( bookContainer );

  }

}


function bindEvent(bookInstance, buttonInstance, bookStatusInstance) {
  buttonInstance.addEventListener( "click", ( event ) => {
    bookInstance.toggleReadBool( event, bookStatusInstance );
  });
}