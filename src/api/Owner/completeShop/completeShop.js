import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShop: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { ownerState } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    ownerState
                }
            });
            return newOwner
        }
    }
}