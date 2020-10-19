import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    loadMorePost:async (_, args) => {
      const { id, username } = args;
      return await prisma.user({username: username}).posts({orderBy:"createdAt_DESC", first:9, after: id});
    }
  }
};