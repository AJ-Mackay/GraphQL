const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@graphql.u5bs9.mongodb.net/graphqldata?retryWrites=true&w=majority`
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Listening on Port 4000');
});
