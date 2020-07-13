import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar } = args;
      const { user } = request;
      const exist = await prisma.$exists.user({ username });
      if(user.username === username){
        return await prisma.updateUser({
            where: { id: user.id },
            data: { avatar }
          });
        } else {
        if(!exist){
          return await prisma.updateUser({
            where: { id: user.id },
            data: { username, avatar }
          });
        }else{
          throw Error("이미 존재하는 아이디 입니다")
        }
      }
    }
  }
};