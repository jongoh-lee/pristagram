import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleDangol: async (_, args, { request }) => {
            isAuthenticated(request);
            const { profileId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        profile: {
                            id: profileId
                        }
                    }
                ]
            };

            try  {
                const existingDangol = await prisma.$exists.dangol(filterOptions);
                if(existingDangol){
                    await prisma.deleteManyDangols(filterOptions);
                }else {
                    await prisma.createDangol({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        profile:{
                            connect:{
                                id: profileId
                            }
                        }
                    })
                }
                return true
            } catch(e) {
                console.log("단골 에러:", e)
                return false
            }
        }
    }
};