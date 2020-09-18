import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchShopList: () => {
        return prisma.owners()
    }
  }
};