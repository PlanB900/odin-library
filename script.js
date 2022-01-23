/*
Multiple fields for user to enter information about book. When 'add' button is pressed,
text content from each is taken and sent as parameters into Book() constructor.
*/

let modal = document.getElementById("addBookForm");
let modalBtn = document.getElementById("modalBtn");
let closeBtn = document.getElementById("closeBtn");

let addBook = document.getElementById("addBook");
let titleField = document.getElementById("titleField");
let authorField = document.getElementById("authorField");
let pagesField = document.getElementById("pagesField");
let markReadBtn = document.getElementById("markReadBtn");

let errorFieldTitle = document.getElementById("errorFieldTitle");
let errorFieldAuthor = document.getElementById("errorFieldAuthor");
let errorFieldPages = document.getElementById("errorFieldPages");

let bookContainer = document.getElementById("bookContainer");
let library = [];



//Book add listener
modalBtn.addEventListener('click',openModal);

//Function to open screen
function openModal(){
   modal.style.display = 'block';
   closeBtn.addEventListener('click',closeModal, {once: true});
   window.addEventListener('click',clickOutside);
}

//Function to close modal
function closeModal(){
    modal.style.display = 'none';
}

//Function to close modal if outside click
function clickOutside(e){
    if(e.target == modal){
        closeModal();
    }
}

//Checks if field input types are correct
function fieldCheck () {
    if(titleField.value == ""){
        errorFieldTitle.style.display = "flex";
    }else{errorFieldTitle.style.display = "none"};

    if(authorField.value == ""){
        errorFieldAuthor.style.display = "flex";
    }else{errorFieldAuthor.style.display = "none"};
    
    if(pagesField.value == "" || isNaN(pagesField.value)){
        errorFieldPages.style.display = "flex";
    }else{errorFieldPages.style.display = "none"};

    if(titleField.value !== "" && authorField.value !== "" && isNaN(pagesField.value) !== true &&
    pagesField.value !== ""){
        pagesField.className = "";
        let book =  new Book(titleField.value,authorField.value,pagesField.value,markReadBtn.textContent);
        library.push(book);
        titleField.value = "";
        authorField.value = "";
        pagesField.value = "";
        createBookCard(book)
        // createCard();
    };
}

//Listen for button click to add book to library
addBook.addEventListener('click',fieldCheck);

//Book constructor
class Book {

    constructor (title, author, pages, isRead){
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }

    isRead () {
        if(this.isRead == false){
            this.isRead = true;
        }else{
            this.isRead = false;
        };
    }
}

//Create book card template
function createBookCardTemplate() {
    let bookCard = document.createElement('div');
    let removeBtn = document.createElement('button');
    let markReadCardBtn = document.createElement('button');
    let bookCardInfo = document.createElement('div');

    bookCard.className = "bookCard";
    removeBtn.className = 'removeBtn';
    removeBtn.innerHTML = "remove";
    markReadCardBtn.className = "markReadCard";
    bookCardInfo.className = "bookCardInfo";

    bookContainer.appendChild(bookCard);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(markReadCardBtn);
    bookCard.appendChild(bookCardInfo);

    return {bookCardInfo, markReadCardBtn}
}

//creates a card for a given book
function createBookCard(book){

    let template = createBookCardTemplate()
    template.markReadCardBtn.textContent = book.isRead
    book.isRead == "Read" ? template.markReadCardBtn.classList.add("Read") : template.markReadCardBtn.classList.add("Unread")

    for (let key in book){
        if(key !== "isRead"){
            let item = document.createElement('div');
            item.textContent = book[key];
            if(key == "title"){item.classList.add('title')};
            template.bookCardInfo.appendChild(item);

            if(key == "pages" && book.key > 1){
                item.textContent += " pages";
            }else if(key == "pages" && book[key] == 1){
                item.textContent += " page";
            };
        }
    };
}

//Listen for remove button click
document.addEventListener('click',(e)=>{
    if(e.target.className == "removeBtn"){

        //Matches info in bookCard with each book in the library, if they match
        //it is removed from the library
        library.forEach(book=>{
            if(book.title == e.target.nextElementSibling.nextElementSibling.firstChild.textContent &&
                book.author == e.target.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.textContent){
                    library.splice(library.indexOf(book),1);
                };
        });
        
        //It is then removed from the bookContainer
        e.target.parentNode.remove();
    };

    //For mark read button on cards and in add card screen
    if(e.target.classList.contains("markReadCard") || e.target.id == "markReadBtn"){
        if(e.target.textContent == "Unread"){
            e.target.textContent = "Read";
            e.target.classList.remove("Unread")
            e.target.classList.add("Read");
        }else if(e.target.textContent == "Read"){
            e.target.textContent = "Unread";
            e.target.classList.remove("Read")
            e.target.classList.add("Unread");
        };
    };
    
});

