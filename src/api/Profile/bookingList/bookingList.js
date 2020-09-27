import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    bookingList: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const { user } = request;
        const { date } = args;
        try {
            const profile = await prisma.user({ id: user.id}).profile();
            const bookings = await prisma.bookings({
                where:{
                    profile:{
                        id: profile.id
                    },
                    firstDate_contains: date
                }
            });
            return bookings
        } catch(e){
            return null
        }
    }
  }
};