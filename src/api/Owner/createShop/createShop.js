import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createShop: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, address, addressDetail, registration, classification, contact, ownerState } = args;
            const owner = await prisma.createOwner({
                address, 
                addressDetail,
                registration,
                classification,
                contact,
                ownerState,
                shopImages:{
                    create: shopImages
                },
                user: { connect : { id: user.id}}
            });
            return owner;
        }
    }
}