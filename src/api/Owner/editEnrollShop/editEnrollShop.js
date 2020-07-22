import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editEnrollShop: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, location, registration, classification, contact, ownerState } = args;
            const owner = await prisma.user({id : user.id}).owner();
            let newImages = shopImages.map( el => (
                {
                    where: { id: el.id},
                    data: { type: el.type, url: el.url}
                }
            ));
            console.log(newImages);
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id },
                data: {
                    shopImages: {
                        updateMany: newImages
                    },
                    location, 
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