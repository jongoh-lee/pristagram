import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "" } = args;
      // 프리스마의 기능입니다.
      const exist = await prisma.$exists.user({
        OR:[
          {
            username
          },
          { email }
        ]
      });
      if(exist){
        throw Error("이미 존재하는 아이디/이메일 입니다.")
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
      });
      return true;
    }
  }
};


