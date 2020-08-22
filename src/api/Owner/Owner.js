import { prisma } from "../../../generated/prisma-client";

export default {
    Owner:{
        shopImages: ({id}) => prisma.owner({id}).shopImages(),
        facility: ({id}) => prisma.owner({id}).facility(),
        calendar: ({id}) => prisma.owner({id}).price(),
    }
}