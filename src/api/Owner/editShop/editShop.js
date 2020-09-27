import { prisma } from "../../../../generated/prisma-client";
import fetch from "node-fetch";

export default {
    Mutation: {
        editShop: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, address, addressDetail, registration, classification, contact, ownerState } = args;
            const owner = await prisma.user({id : user.id}).owner();
            let newImages = shopImages.map( el => (
                {
                    where: { id: el.id},
                    data: { type: el.type, url: el.url}
                }
            ));
            const { results } = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&address=` + encodeURIComponent(address) + `&key=${process.env.GOOGLE_API_KEY}`).then(e => e.json()).then(data => data);
            await prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    contact
                }
            });
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id },
                data: {
                    shopImages: {
                        updateMany: newImages
                    },
                    address, 
                    addressDetail,
                    registration, 
                    classification, 
                    contact, 
                    ownerState,
                    latitude:results[0].geometry.location.lat,
                    longitude: results[0].geometry.location.lng,
                },
            });
            
            return newOwner;
        }
    }
};