import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    editUsername: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username } = args;
      const { user } = request;
      if(username === user.username){
          return false
      } else {
          return await prisma.$exists.user({ username });
      }
    }
  }
};