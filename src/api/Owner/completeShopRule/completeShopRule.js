import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShopRule: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { checkIn, checkOut, minReserve } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    checkIn,
                    checkOut,
                    minReserve,
                }
            });
            return newOwner
        }
    }
}