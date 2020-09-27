import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchShopList: async () => {
        const owners = await prisma.owners();
        return owners.filter(owner => owner.ownerState === 3);
    }
  }
};