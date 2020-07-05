import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        checkProfile: async (_, __, {request, isAuthenticated} ) => {
            isAuthenticated(request);
            const { user } = request;
            const profile = await prisma.user({id : user.id}).profile();
            if(profile === null){
                return 0
            } else if (profile && profile.profileState === 1){
                return 1
            } else if (profile && profile.profileState === 2) {
                return 2
            }
            
        }
    }
}