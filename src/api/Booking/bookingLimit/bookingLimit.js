import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        bookingLimit: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { today, ownerId } = args;
            const { user } = request;
            const profile = await prisma.user({ id: user.id }).profile();
            if(profile){
                const bookings = await prisma.bookings({
                    where:{
                        profile:{
                            id: profile.id
                        },
                        owner:{
                            id: ownerId
                        },
                        firstDate_gte: today,
                    }
                });
                return bookings;
            }else{
                return null
            }
        }
    }
};