import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editProfile: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { mainMenu, foodGuide, career, contact } = args;
            const profile = await prisma.user({id : user.id}).profile();
            const newProfile = await prisma.updateProfile({
                data: {
                mainMenu,
                foodGuide,
                career,
                contact,
                },
                where: { id: profile.id }
            })
            return newProfile;
        }
    }
};