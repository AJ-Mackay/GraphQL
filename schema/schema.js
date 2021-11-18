const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
var books = [
  { name: 'John Dies at the End', genre: 'Fantasy', id: '1' },
  { name: 'The Book With No Name', genre: 'Horror', id: '2' },
  { name: 'Solitaire', genre: 'Young Adult', id: '3' },
];

var authors = [
  { name: 'David Wong (Jason Pargin)', age: 46, id: '1' },
  { name: 'Anonymous (The Bourbon Kid)', age: 0, id: '2' },
  { name: 'Alice Oseman', age: 27, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
