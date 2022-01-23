let modal = document.getElementById("addBookForm");
let modalBtn = document.getElementById("modalBtn");
let closeBtn = document.getElementById("closeBtn");

let addBook = document.getElementById("addBook");
let bookFields = Array.from(document.getElementsByClassName('bookField'));
let markReadBtn = document.getElementById("markReadBtn");

let bookContainer = document.getElementById("bookContainer");
let library = [];

const Modal = (() => {

    let closeModal = () => {
        modal.style.display = 'none';
    }

    let clickOutside = (e) => {
        if(e.target == modal){
            closeModal();
        }
    }

    let openModal = () => {
        modal.style.display = 'block';
        closeBtn.addEventListener('click',closeModal, {once: true});
        window.addEventListener('click',clickOutside);
    }

    modalBtn.addEventListener('click',openModal);
    markReadBtn.addEventListener('click',markReadBtnFunctionality)

})()

//Checks if field input types are correct
function fieldCheck () {

    function createErrorField(bookField, type){
        let errorField = document.createElement('div')
        errorField.className = "errorField"

        type === "notPages" ? errorField.textContent = `*Required` : 
        errorField.textContent = `Please enter a page number.`

        bookField.parentNode.lastChild.remove()
        bookField.parentNode.appendChild(errorField)
    }
    
    let errorCounter = 0
    bookFields.forEach((bookField, index) => {
        if (index == 2 && isNaN(bookField.value)){
            createErrorField(bookField, "Pages")
            errorCounter++
        } else if (bookField.value == ""){
            createErrorField(bookField, "notPages")
            errorCounter++
        }
    })

    if(errorCounter === 0){
        let book =  new Book(bookFields[0].value,bookFields[1].value,bookFields[2].value,markReadBtn.textContent);
        library.push(book);
        bookFields.forEach(bookField => {bookField.value = ""})
        createBookCard(book)
    };
}

//Listen for button click to add book to library
addBook.addEventListener('click', fieldCheck);

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

//Create book card template, used by createBookCard
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

    removeBtn.addEventListener('click', removeBtnFunctionality, {once: true})
    markReadCardBtn.addEventListener('click', markReadBtnFunctionality)

    bookContainer.appendChild(bookCard);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(markReadCardBtn);
    bookCard.appendChild(bookCardInfo);

    return {bookCardInfo, markReadCardBtn}
}

//Mark read button functionality
function markReadBtnFunctionality(e){
    if(e.target.classList.contains("markReadCard") || e.target.id == "markReadBtn"){
        if(e.target.textContent == "Unread"){
            e.target.textContent = "Read";
            e.target.classList.remove("Unread")
            e.target.classList.add("Read");
        } else {
            e.target.textContent = "Unread";
            e.target.classList.remove("Read")
            e.target.classList.add("Unread");
        };
    };
}

//Remove button functionality
function removeBtnFunctionality(e){
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
}

//creates a card for a given book
function createBookCard(book){

    let template = createBookCardTemplate()
    template.markReadCardBtn.textContent = book.isRead

    book.isRead == "Read" ? template.markReadCardBtn.classList.add("Read") : 
    template.markReadCardBtn.classList.add("Unread")

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
