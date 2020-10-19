import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    loadMoreReview: async (_, args) => {
      const { id, profileId } = args;
      return await prisma.profile({id: profileId}).posts({orderBy:"createdAt_DESC", first:9, after: id});
    }
  }
};