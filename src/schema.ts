import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    author: String!
    title: String!
    year: Int!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(author: String!, title: String!, year: Int!): Book!
    updateBook(id: ID!, author: String, title: String, year: Int): Book!
    deleteBook(id: ID!): Book!
    addTestBooks: [Book!]!
  }
`;