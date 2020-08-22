import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        completeShopImage: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { createImages, deleteImages, editImages } = args;
            const owner = await prisma.user({id : user.id}).owner();
            let _edit = editImages.map( el => (
                {
                    data: { type: el.type, url: el.url},
                    where: { id : el.id }
                }
            ));
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    shopImages: {
                        updateMany:  _edit,
                        create: createImages,   
                        deleteMany: deleteImages,
                    }
                }
            });
            return newOwner;
        }
    }
}