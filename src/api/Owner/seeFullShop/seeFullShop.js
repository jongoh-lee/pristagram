import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullShop: (_, args) => {
        const { id } = args;
        return prisma.owner({ id });
    }
  }
};