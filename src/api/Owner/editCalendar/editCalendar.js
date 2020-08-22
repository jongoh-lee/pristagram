import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editCalendar: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { updatePrice, createPrice } = args;
            let _update = updatePrice.map( el => (
                {
                    data: { isSelf: el.isSelf, perDay: el.perDay, off: el.off},
                    where: { id : el.id }
                }
            ));
            const owner = await prisma.user( { id: user.id }).owner();
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id },
                data: {
                    price: {
                        updateMany: _update,
                        create: createPrice
                    }
                }
            });
            return newOwner;
        }
    }
}