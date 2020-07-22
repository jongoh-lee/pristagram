import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editProfile: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { menuImage, menuName, salePrice, foodGuide, career, contact, profileState, sector } = args;
            const profile = await prisma.user({id : user.id}).profile();
            const newProfile = await prisma.updateProfile({
                data: {
                    menuImage, menuName, salePrice, foodGuide, career, contact, profileState, sector
                },
                where: { id: profile.id }
            })
            return newProfile;
        }
    }
};