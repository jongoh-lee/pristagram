import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myShop: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const owner = prisma.user({id : user.id}).owner();
      return owner
    }
  }
};