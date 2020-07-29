import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        enrollShop: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, location, registration, classification, contact, ownerState } = args;
            const owner = await prisma.createOwner({
                location, 
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