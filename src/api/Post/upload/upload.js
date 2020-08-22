import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const {id, tasting, createFiles } = args;
            try {
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

            })
            return profile;
            } catch(e) {
                console.log(e)
            }
        }
    }
};