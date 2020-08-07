import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createShop: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, address, registration, classification, contact, ownerState } = args;
            const owner = await prisma.createOwner({
                address, 
                registration,
                classification,
                contact,
                ownerState,
                user: { connect : { id: user.id}}
            });
            shopImages.forEach(
                async image => 
                await prisma.createShopImage({
                    ...image,
                    owner: {
                        connect:{
                            id: owner.id
                        }
                    }
                })
            );
            return owner;
        }
    }
}