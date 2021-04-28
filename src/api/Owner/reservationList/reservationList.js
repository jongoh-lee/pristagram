import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    reservationList: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const { user } = request;
        const { date } = args;
        try {
            const owner = await prisma.user({ id: user.id}).owner();
            const profile = await prisma.user({ id: user.id}).profile();
            if(profile?.profileState === 3 ){
                const bookings = await prisma.bookings({
                    where:{
                        owner:{
                            id: owner.id
                        },
                        profile:{
                            id_not: profile.id
                        },
                        firstDate_contains: date
                    }
                });
                return bookings
            }else{
                const bookings = await prisma.bookings({
                    where:{
                        owner:{
                            id: owner.id
                        },
                        firstDate_contains: date
                    }
                });
                return bookings
            }
        } catch(e){
            console.log("점주 예약 확인 에러",e);
            return null
        }
    }
  }
};