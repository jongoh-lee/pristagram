import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShopDescription: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopName, district, description, precaution, hashTag } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    shopName,
                    district,
                    description,
                    precaution,
                    hashTag,
                }
            });
            return newOwner
        }
    }
}