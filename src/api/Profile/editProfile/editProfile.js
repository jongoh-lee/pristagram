import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editProfile: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { menuImage, menuName, salePrice, foodGuide, career, contact, profileState, classification } = args;
            const profile = await prisma.user({id : user.id}).profile();
            await prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    contact
                }
            });
            const newProfile = await prisma.updateProfile({
                data: {
                    menuImage, menuName, salePrice, foodGuide, career, contact, profileState, classification
                },
                where: { id: profile.id }
            })
            return newProfile;
        }
    }
};