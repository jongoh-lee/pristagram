import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myEarnings: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const { user } = request;
        const { date } = args;
        try {
            const owner = await prisma.user({ id: user.id}).owner();
            const prices = await prisma.prices({
                where:{
                    owner:{
                        id: owner.id
                    },
                    dateString_contains: date,
                    isBooked: true
                }
            });
            if(prices.length > 0){
                return prices.map( day => parseInt(day.priceState)).reduce((a, b) => a + b, 0);
            }else{
                return 0
            }
        } catch(e){
            return 0
        }
    }
  }
};