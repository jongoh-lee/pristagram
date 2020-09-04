import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        myDangol: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.dangols({
                where:{
                    user: {
                        id: user.id
                    }
                }
            })

        }
    }
}