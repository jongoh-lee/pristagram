import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    reservationList: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const { user } = request;
        const { date } = args;
        try {
            const owner = await prisma.user({ id: user.id}).owner();
            const bookings = await prisma.bookings({
                where:{
                    owner:{
                        id: owner.id
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