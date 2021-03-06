const resolvers = {
  Query: {
    currentUser: (parent, args, context) => context.getUser()
  },
  Mutation: {
    logout: (parent, args, context) => context.logout()
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate("graphql-local", {
        email,
        password
      });
      await context.login(user);
      return { user };
    }
  }
};

export default resolvers;
