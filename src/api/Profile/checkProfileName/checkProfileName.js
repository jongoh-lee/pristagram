import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        checkProfileName: async (_, arg) => {
            const { profileName } = arg;
            const exist = await prisma.$exists.profile({ profileName });
            if(exist){
                return false
            }else{
                return true
            }
        }
    }
}