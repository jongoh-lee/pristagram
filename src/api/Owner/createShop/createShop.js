import { prisma } from "../../../../generated/prisma-client";
import fetch from "node-fetch";

export default {
    Mutation: {
        createShop: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { shopImages, address, addressDetail, registration, classification, contact, ownerState } = args;
            const { results } = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&address=` + encodeURIComponent(address) + `&key=${process.env.GOOGLE_API_KEY}`).then(e => e.json()).then(data => data);
            await prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    contact
                }
            });
            const owner = await prisma.createOwner({
                address, 
                addressDetail,
                registration,
                classification,
                contact,
                ownerState,
                latitude:results[0].geometry.location.lat,
                longitude: results[0].geometry.location.lng,
                shopImages:{
                    create: shopImages
                },
                user: { connect : { id: user.id}},
            });
            return owner;
        }
    }
}