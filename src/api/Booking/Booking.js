import { prisma } from "../../../generated/prisma-client";

export default {
    Booking:{
        profile: ({id}) => prisma.booking({ id }).profile(),
        owner: ({id}) => prisma.booking({ id }).owner(),
        prices: ({id}) => prisma.booking({ id }).prices()
    }
}