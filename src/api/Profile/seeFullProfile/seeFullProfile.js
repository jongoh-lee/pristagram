import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullProfile: async (_, args) => {
      const { id } = args;
      return prisma.profile({ id });
    }
  }
};