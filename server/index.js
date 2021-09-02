const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true
}));

app.listen(5000, () => console.log('Server started on port 5000'));
