import { prisma } from "../../../generated/prisma-client";

export default {
    Owner:{
        shopImages: ({id}) => prisma.owner({id}).shopImages(),
    }
}