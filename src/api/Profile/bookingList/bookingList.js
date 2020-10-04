import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    bookingList: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const { user } = request;
        const { date } = args;
        const owner = await prisma.user({ id: user.id}).owner();
        const profile = await prisma.user({ id: user.id}).profile();
        try {
            if(owner){
                const bookings = await prisma.bookings({
                    where:{
                        owner:{
                            id_not: owner.id
                        },
                        profile:{
                            id: profile.id
                        },
                        firstDate_contains: date
                    }
                });
                return bookings
            }else{
                const bookings = await prisma.bookings({
                    where:{
                        profile:{
                            id: profile.id
                        },
                        firstDate_contains: date
                    }
                });
                return bookings
            }
        } catch(e){
            return null
        }
    }
  }
};