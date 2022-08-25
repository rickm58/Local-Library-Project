function getTotalBooksCount(books) {
  return books.reduce((total) => {
    total++;
return total;
  }, 0);
}

  
const getTotalAccountsCount = (accounts) => {
  let totalAccounts = 0;
  for (let account in accounts) {
    if (account) {
      totalAccounts++
    }
  }
  return totalAccounts
}

function getBooksBorrowedCount(books) {
  let myBorrowedFilter = books.filter(book => !book.borrows[0].returned)
  let myBorrowedMap = myBorrowedFilter.map(book => book.title);
  return myBorrowedMap.length;
}

function getMostCommonGenres(books) {
  const mostCommon = [];
  for (let book of books) {
    if (mostCommon.length === 0 || !mostCommon.some(item => item.name === book.genre)) { 
      let currentGenre = book.genre;
      let genreFilter = books.filter(book => book.genre === currentGenre);
      let myObj = {};
      myObj.name = currentGenre;
      myObj.count = genreFilter.length;
      mostCommon.push(myObj);
    }
  }
  mostCommon.sort((genreA, genreB) => genreB.count > genreA.count ? 1 : -1);
  return mostCommon.slice(0,5);
}

function getMostPopularBooks(books) {
  const mostPopular = [];
  for (let book of books) {
    if (mostPopular.length === 0 || !mostPopular.some(popularBook => popularBook.name === book.title)) {
      let currentBook = book.title;
      let popularity = book.borrows.length;
      let myObj = {};
      myObj.name = currentBook;
      myObj.count = popularity;
      mostPopular.push(myObj);
    }
  }
  mostPopular.sort((bookA, bookB) => bookB.count - bookA.count);
  return mostPopular.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const mostPopular = [];
  authors.forEach(author => {
    let myAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    };
    books.forEach(book => {
      if (book.authorId === author.id) {
        myAuthor.count += book.borrows.length;
      }
    })
    mostPopular.push(myAuthor);
  });
  mostPopular.sort((authorA, authorB) => authorB.count - authorA.count);
  return mostPopular.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
