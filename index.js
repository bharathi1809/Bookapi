// Framework
const express = require("express");

//initializing express
const bookStore = express();

//Database
const dataBase = require("./DataBase/index");

//configuration
bookStore.use(express.json());


/*
Route           /
description     get all books
Access          public
Parameter       none
method          GET
*/

bookStore.get("/",(req, res) =>{
    return res.json({books: dataBase.books});
});

/*
Route           /book
description     get a specific book based on ISBN
Access          public
Parameter       :isbn
method          GET
*/

bookStore.get("/book/:isbn", (req, res) =>{
    const getSpecificBook = dataBase.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0){
        return res.json({
            error : `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book:getSpecificBook});
});

/*
Route           /c
description     get a specific books based on category
Access          public
Parameter       :category
method          GET
*/

bookStore.get("/c/:category", (req,res) => {
    const getSpecificBooks = dataBase.books.filter((book) =>
        book.category.includes(req.params.category)
    );

    if (getSpecificBooks.length === 0){
        return res.json({
            error : `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({book:getSpecificBooks}); 
});


/*
Route           /a
description     get a specific books based on author
Access          public
Parameter       :author
method          GET
*/

bookStore.get("/a/:author", (req,res) =>{
    const getSpecificBooks = dataBase.books.filter(
    (book) => book.authors.includes(parseInt(req.params.author))
        
    );

    if (getSpecificBooks.length === 0){
        return res.json({
            error : `No book found for the authors of ${req.params.authors}`,
        });
    }

    return res.json({book:getSpecificBooks}); 
});

/*
Route           /author
description     get all authors
Access          public
Parameter       none
method          GET
*/

bookStore.get("/author",(req, res) => {
    return res.json({author: dataBase.authors});
});

/*
Route           /author
description     to get specific author based on id
Access          public
Parameter      id
method          GET
*/

bookStore.get("/author/:id", (req, res) =>{
    const getSpecificauthor = dataBase.authors.filter(
        (author) => author.id==(parseInt(req.params.id))
        
    );

    if (getSpecificauthor.length === 0){
        return res.json({
            error : `No author found for the ID of ${req.params.id}`,
        });
    }

    return res.json({book:getSpecificauthor});
});

/*
Route           /author/auth/
description     to get specific author based on books
Access          public
Parameter       :book
method          GET
*/

bookStore.get("/author/auth/:book", (req, res) =>{
    const getSpecificauthor = dataBase.authors.filter(
        (author) => author.books.includes(req.params.book)
        
    );

    if (getSpecificauthor.length === 0){
        return res.json({
            error : `No author found for the Book of ${req.params.book}`,
        });
    }

    return res.json({book:getSpecificauthor});
});

/*
Route           /publications
description     to get all publications 
Access          public
Parameter       none
method          GET
*/

bookStore.get("/publications",(req, res) => {
    return res.json({author: dataBase.publications});
});

/*
Route           /publication
description     to get specific publication based on id
Access          public
Parameter       id
method          GET
*/

bookStore.get("/publications/:id", (req, res) =>{
    const getSpecificPublication = dataBase.publications.filter(
        (publication) => publication.id==(parseInt(req.params.id))
        
    );

    if (getSpecificPublication.length === 0){
        return res.json({
            error : `No publications found for the ID of ${req.params.id}`,
        });
    }

    return res.json({publications:getSpecificPublication});
});


/*
Route           /publications/book/
description     to get specific publications based on books
Access          public
Parameter       :book
method          GET
*/

bookStore.get("/publications/pub/:book", (req, res) =>{
    const getSpecificPublication = dataBase.publications.filter(
        (publication) => publication.books.includes(req.params.book)
        
    );

    if (getSpecificPublication.length === 0){
        return res.json({
            error : `No author found for the Book of ${req.params.book}`,
        });
    }

    return res.json({publications:getSpecificPublication});
});


/*
Route           book/new
description     add new books
Access          public
Parameter       none
method          POST
*/

bookStore.post("/book/new",(req,res)=>{
    const{ newBook }  = req.body;
    dataBase.books.push(newBook);
    return res.json({ books: dataBase.books, message: "Book was added!!"})
});


/*
Route           author/new
description     add new author
Access          public
Parameter       none
method          POST
*/

bookStore.post("/author/new",(req,res)=>{
    const{ newAuthor }  = req.body;
    dataBase.authors.push(newAuthor);
    return res.json({ authors: dataBase.authors, message: "Author was added!!"})
});


/*
Route           /publications/new
description     add new Publications
Access          public
Parameter       none
method          POST
*/

bookStore.post("/publications/new",(req,res)=>{
    const{ newPublication }  = req.body;
    dataBase.publications.push(newPublication);
    return res.json({ publications: dataBase.publications, message: "publication was added!!"})
});

/*
Route           /book/update
description     update title of book
Access          public
Parameter       title
method          PUT
*/

bookStore.put("/book/update/:isbn", (req ,res) =>{
    dataBase.books.forEach((book) =>{
        if (book.ISBN == req.params.isbn){
         book.title = req.body.bookTitle;
         return;
        }
    });
    return res.json( {books:dataBase.books})
});


/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
bookStore.put("/book/update/author/:isbn", (req, res) => {
    // update book database
  
    dataBase.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        return book.authors.push(req.body.newAuthor);
      }
    });
  
    // update author database
  
    dataBase.authors.forEach((author) => {
      if (author.id === req.params.newAuthor)
        return author.books.push(req.params.isbn);
    });
  
    return res.json({ books: dataBase.books, author: dataBase.authors });
  });










bookStore.listen(3000,() => console.log("server started!!!"));