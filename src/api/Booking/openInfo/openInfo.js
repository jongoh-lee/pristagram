import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        openInfo: async (_, args) => {
            const { today, id } = args;
            const bookings = await prisma.profile({ id }).bookings({
                where:{
                    prices_some:{
                        dateString_gte: today
                    },
                    isCancelled: false
                }
            })
            return bookings;
        }
    }
};