import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editMe: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar } = args;
      const { user } = request;
      const newUser = await prisma.updateUser({
        where: { id: user.id },
        data: { username, avatar }
      });

      return newUser;
    }
  }
};