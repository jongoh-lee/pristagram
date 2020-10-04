import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        shopOnSale: async (_, args,) => {
            const { dateInput } = args;
            const onSale = await prisma.bookings({
                where:{
                    prices_some:{
                        dateString_in: dateInput,
                        OR:[{
                            isBooked:true,    
                        },{
                            priceState: "self"
                        }]
                    },
                }
            });
            return onSale;
        }
    }
};