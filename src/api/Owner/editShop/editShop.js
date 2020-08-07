import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editShop: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, address, registration, classification, contact, ownerState } = args;
            const owner = await prisma.user({id : user.id}).owner();
            let newImages = shopImages.map( el => (
                {
                    where: { id: el.id},
                    data: { type: el.type, url: el.url}
                }
            ));
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id },
                data: {
                    shopImages: {
                        updateMany: newImages
                    },
                    address, 
                    registration, 
                    classification, 
                    contact, 
                    ownerState,
                },
            });
            
            return newOwner;
        }
    }
};