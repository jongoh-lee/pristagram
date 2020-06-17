import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        checkUsername: async (_, arg) => {
            const { username } = arg;
            const exist = await prisma.$exists.user({ username });
            if(exist){
                return false
            }
            return true
        }
    }
}