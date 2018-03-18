const GraphQL = require('graphql');
const GraphQLRelay = require('graphql-relay');

import db from './database';

const nodeDefinitions = GraphQLRelay.nodeDefinitions((globalId) => {
  const idInfo = GraphQLRelay.fromGlobalId(globalId)
  switch(idInfo.type) {
    case 'User':
      return db.getUser(idInfo.id);
    case 'Movie':
      return db.getMovie(idInfo.id);
    default:
      return null;
  }
});

const movieType = new GraphQL.GraphQLObjectType({
  name: 'Moview',
  description: 'A cool way to spend time',
  isTypeOf: (obj) => obj instanceof db.Movie,
  fields: {
    id: GraphQLRelay.globalIdField('Movie'),
    title: {
      type: GraphQL.GraphQLString,
      description: 'The title of the movie',
    },
    rating: {
      type: GraphQL.GraphQLInt,
      description: 'The rating user gave the movie',
    },
  },
  interfaces: [nodeDefinitions.nodeInterface],
});

const viewerType = new GraphQL.GraphQLObjectType({
  name: 'Viewer',
  description: 'A person who uses our app',
  isTypeOf: (obj) => obj instanceof db.User,
  fields: () => ({
    favoriteMovie: {
      type: movieType,
      description: 'The favorite film of the user',
      resolve: () => db.getFavoriteMovie(),
    },
    movies: {
      description: 'A user\'s collection of movie ratings',
      type: GraphQLRelay.connectionDefinitions({
        name: 'Movie', nodeType: movieType
      }).connectionType,
      args: GraphQLRelay.connectionArgs,
      resolve: (_viewer, args) =>
        GraphQLRelay.connectionFromArray(db.getMovies(), args),
    },
  }),
});

const schema = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeDefinitions.nodeField,
      viewer: {
        type: viewerType,
        resolve: () => db.getAnonymousUser(),
      },
    },
  }),
});

export default schema;
