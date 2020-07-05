import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myProfile: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const profile= await prisma.user({id : user.id}).profile();
      return profile
    }
  }
};