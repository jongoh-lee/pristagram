import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editCalendar: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { updatePrice, createPrice, deletePrice } = args;
            let _update = updatePrice.map( el => (
                {
                    data: { dateString:el.dateString, priceState: el.priceState},
                    where: { id : el.id }
                }
            ));
            const owner = await prisma.user( { id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id },
                data: {
                    calendar: {
                        updateMany: _update,
                        create: createPrice,
                        deleteMany: deletePrice
                    }
                }
            });
            return newOwner;
        }
    }
}