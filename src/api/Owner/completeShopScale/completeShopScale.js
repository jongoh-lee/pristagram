import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShopScale: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { chairs, tables, scale } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    chairs: chairs,
                    tables: tables,
                    scale:scale
                }
            });
            return newOwner
        }
    }
}