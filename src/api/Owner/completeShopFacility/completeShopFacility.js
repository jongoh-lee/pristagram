import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        completeShopFacility: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { facility } = args;
            const owner = await prisma.user({id : user.id}).owner();
            const isFacility = await prisma.$exists.facility({ owner: {id: owner.id}});
            if(!isFacility){
                await prisma.createFacility({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
            }
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    facility: {
                        update:{
                            ...facility
                        }
                    },
                }
            });
            return newOwner;
        }
    }
}