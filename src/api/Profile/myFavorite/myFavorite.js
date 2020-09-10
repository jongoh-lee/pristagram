import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        myFavorite: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const profile = await prisma.user({id: user.id}).profile();
            return await prisma.favorites({
                where:{
                    profile: {
                        id: profile.id
                    }
                }
            })

        }
    }
}