import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createProfile: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { mainMenu, foodGuide, career, contacts } = args;
            const profile = await prisma.createProfile({
                mainMenu,
                foodGuide,
                career,
                contacts,
                user: {connect: { id: user.id}}
            })

            return profile;
        }
    }
};