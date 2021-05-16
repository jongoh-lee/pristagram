import { prisma } from "../../../generated/prisma-client";

export default {
    Wallet:{
        profile: ({id}) => prisma.wallet({ id }).profile(),
    }
}