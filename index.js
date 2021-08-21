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

bookStore.get("/books",(req, res) =>{
    return res.json({books: dataBase.books});
});

/*
Route           /
description     get a specific book based on ISBN
Access          public
Parameter       :isbn
method          GET
*/

bookStore.get("/:isbn", (req, res) =>{
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
Route           /
description     get all authors
Access          public
Parameter       author
method          GET
*/

bookStore.get("/author",(req, res) => {
    return res.json({author: dataBase.authors});
});





















bookStore.listen(3000,() => console.log("server started!!!"));