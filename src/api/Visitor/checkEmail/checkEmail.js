import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        checkEmail: async (_, arg) => {
            const { email } = arg;
            const exist = await prisma.$exists.user({ email });
            if(exist){
                return false
            }
            return true
        }
    }
}