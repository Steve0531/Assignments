const bookLibrary ={
    books : [],
    
    addBook(book) {
        this.books.push(book)
    },

    getBookByAuthor(author){
         return this.books.filter(book=>book.author===author)

    },

    removeBook(title){
        this.books=this.books.filter(book=>book.title !== title)

    },

    getAllBooks(){
        return this.books;
    }

};

bookLibrary.addBook({ title: "Filter", author: "Steve", year: 2002 });
bookLibrary.addBook({ title: "Map", author: "Savio", year: 1996 });
bookLibrary.addBook({ title: "Cars", author: "Rohan", year: 1999 });
bookLibrary.addBook({ title: "Bikes", author: "Shiv", year: 2008 });
bookLibrary.addBook({ title: "Mobile", author: "Grace", year: 2012 });

console.log("All Books - " ,bookLibrary.getAllBooks());
console.log("Author(Steve) - " ,bookLibrary.getBookByAuthor("Steve"));
bookLibrary.removeBook("Cars");
console.log("Book Deleted");

/*  OUTPUT

All Books -  [
  { title: 'Filter', author: 'Steve', year: 2002 },
  { title: 'Map', author: 'Savio', year: 1996 },
  { title: 'Cars', author: 'Rohan', year: 1999 },
  { title: 'Bikes', author: 'Shiv', year: 2008 },
  { title: 'Mobile', author: 'Grace', year: 2012 }
]
Author(Steve) -  [ { title: 'Filter', author: 'Steve', year: 2002 } ]
Book Deleted

*/
