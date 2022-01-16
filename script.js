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
}

//Modal close listener
closeBtn.addEventListener('click',closeModal);

//Function to close modal
function closeModal(){
    modal.style.display = 'none';
}

//Listen to outside click
window.addEventListener('click',clickOutside);

//Function to close modal if outside click
function clickOutside(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
}

//Listen for button click to add book to library
addBook.addEventListener('click',()=>{
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
        createCard();
    };
});

//Book constructor
function Book(title,author,pages,isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}
Book.prototype.isRead = function(){
    if(this.isRead == false){
        this.isRead = true;
    }else{
        this.isRead = false;
    };
}


//Display card for latest element in library
function createCard(){
    let bookCard = document.createElement('div');
    bookCard.className = "bookCard";
    bookContainer.appendChild(bookCard);

    let removeBtn = document.createElement('button');
    removeBtn.className = 'removeBtn';
    removeBtn.innerHTML = "remove";
    bookCard.appendChild(removeBtn);

    let markReadCard = document.createElement('button');
    markReadCard.className = "markReadCard";
    bookCard.appendChild(markReadCard);

    let bookCardInfo = document.createElement('div');
    bookCardInfo.className = "bookCardInfo";
    bookCard.appendChild(bookCardInfo);

    //Takes the latest 'addition' to the library, iterates through each 
    //key-value item, and appends it as an element to bookCardInfo
    //Also adds pages to the page element
    for (let key in library[library.length-1]){

        if(key !== "isRead"){
            let item = document.createElement('div');
            item.textContent = library[library.length-1][key];
            if(key == "title"){item.classList.add('title')};
            bookCardInfo.appendChild(item);


            if(key == "pages" && library[library.length-1][key] > 1){
                item.textContent += " pages";
            }else if(key == "pages" && library[library.length-1][key] == 1){
                item.textContent += " page";
            };

        };

        if(key == "isRead"){
            markReadCard.textContent = library[library.length-1][key];
            if(markReadCard.textContent == "Read"){markReadCard.classList.add("Read")}
            else if(markReadCard.textContent == "Unread"){markReadCard.classList.add("Unread")};
        };

    };
};


//Listen for remove button click
document.addEventListener('click',(e)=>{
    if(e.target.className == "removeBtn"){

        //Matches info in bookCard with each book in the library, if they match
        //it is removed from the library
        library.forEach(book=>{
            if(book.title == e.target.nextElementSibling.firstChild.textContent &&
                book.author == e.target.nextElementSibling.firstChild.nextElementSibling.textContent){
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

