import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeShopAccount: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { createAccount, updateAccount } = args;
            const owner = await prisma.user({ id: user.id }).owner();
            if(createAccount){
                const newOwner = await prisma.updateOwner({
                    where: { id: owner.id},
                    data: {
                        account:{
                            create: createAccount
                        }
                    }
                });
                return newOwner
            }else{
                const newOwner = await prisma.updateOwner({
                    where: { id: owner.id},
                    data: {
                        account:{
                            update: updateAccount
                        }
                    }
                });
                return newOwner
            }
        }
    }
}