const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  let myAuthor = authors.find(author => author.id === id);
  return myAuthor;
}

function findBookById(books, id) {
  let myBook = books.find(book => book.id === id);
  return myBook;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedArray = books.filter(book => !book.borrows[0].returned);
  const returnedArray = books.filter(book => book.borrows[0].returned);
  const combinedArray = [[...borrowedArray],[...returnedArray]];
  return combinedArray
}

function getBorrowersForBook({ borrows }, accounts) {
  let myBorrowers = [];
  for (let i = 0; i < borrows.length; i++) {
    let myId = borrows[i].id;
    let myAccount = findAccountById(accounts, myId);
    myAccount.returned = borrows[i].returned;
    if (myBorrowers.length <= 9) {
      myBorrowers.push(myAccount);
      }
  }
  return myBorrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
