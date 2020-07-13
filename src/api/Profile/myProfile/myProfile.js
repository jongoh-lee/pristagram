import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myProfile: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const profile = prisma.user({id : user.id}).profile();
      return profile
    }
  }
};