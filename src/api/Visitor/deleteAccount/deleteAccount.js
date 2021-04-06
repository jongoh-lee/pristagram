import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, args) => {
      const { id } = args;
      // 프리스마의 기능입니다.
      await prisma.deleteUser({
        id
      });
      return true;
    }
  }
};


