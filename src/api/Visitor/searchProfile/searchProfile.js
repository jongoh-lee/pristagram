import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProfile: async (_, args) => {
        const { name } = args
        const profiles = await prisma.profiles({
            where:{
                profileName_contains: name,
                release:true,
                profileState: 3,
            },
            orderBy: "createdAt_DESC"
        });
        return profiles
    }
  }
};