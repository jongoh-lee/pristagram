import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const {id, tasting, createFiles } = args;
            const walletFilterOption = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        profile: {
                            id
                        }
                    }
                ]
            }
            try {
            const existingWallet = await prisma.$exists.wallet(walletFilterOption);
            if(!existingWallet){
                await prisma.createWallet({
                    user:{
                        connect:{
                            id: user.id
                        }
                    },
                    profile:{
                        connect:{
                            id
                        }
                    },
                    incoming: 0,
                    outgoing: 0
                })
            }
            const profile = await prisma.updateProfile({
                where: { id: id },
                data:{
                    posts:{
                        create: {
                            tasting,
                            user:{ connect: { id: user.id} },
                            files: {
                                create: createFiles
                            }
                        }
                        
                    }
                }

            });
            return profile;
            } catch(e) {
                console.log(e)
            }
        }
    }
};