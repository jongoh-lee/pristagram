import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    loadMorePost:async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      return await prisma.user({id: user.id}).posts({orderBy:"createdAt_DESC", first:9, after: id});
    }
  }
};