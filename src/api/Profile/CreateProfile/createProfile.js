import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createProfile: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { menuImage, menuName, salePrice, foodGuide, career, contact, profileState, classification } = args;
            await prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    contact
                }
            });
            const profile = await prisma.createProfile({
                menuImage, 
                menuName, 
                salePrice,
                fullPrice:salePrice,
                foodGuide,
                career,
                contact,
                profileState,
                classification,
                user: {connect: { id: user.id}}
            })
            return profile;
        }
    }
};