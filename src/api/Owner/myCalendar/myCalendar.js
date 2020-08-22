import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myCalendar: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const owner = await prisma.user({id: user.id}).owner();
      return await  prisma.prices({
        where: {
          owner:{
            id: owner.id
          }
        }
      })
    }
  }
};