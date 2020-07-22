import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      const exist = await prisma.$exists.user({email})
      if(exist){
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        setTimeout(async()=>{
          await prisma.updateUser({ data: { loginSecret : "" }, where: { email } });
        },[180000])
        return true;
      }
        return false;
    }
  }
};