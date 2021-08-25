let books = [{
  ISBN: "1234ONE",
  title: " The Nun ",
  authors: [1, 2],
  language: "en",
  pubDate: "2021-07-10",
  numOfPages: "221",
  category: ["horror", "fiction"],
  publication: 1,
},
{
  ISBN: "1234THREE",
  title: " Lock and key ",
  authors: [1],
  language: "en",
  pubDate: "2021-07-30",
  numOfPages: "544",
  category: ["horror", "action", "advancher"],
  publication: 1,
},
];

//authors
let authors = [{
      id: 1,
      name: "bharathi",
      book: ["1234ONE", "1234TWO"]
  }, {
      id: 2,
      name: "john",
      book: ["1234NINE"]
  },
  {
      id: 3,
      name: "alex",
      book: ["1234ONE"]
  },
]
//publications
let publications = [{
id: 1,
name: "V.M.K",
books: ["1234ONE", "1234NINE"]
}, {
id: 2,
name: "pheonix",
books: ["1234TWO"]
}];


//sending file
module.exports = { books, authors, publications };