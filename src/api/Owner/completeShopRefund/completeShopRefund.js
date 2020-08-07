import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShopRefund: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { refundAgree } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    refundAgree
                }
            });
            return newOwner
        }
    }
}