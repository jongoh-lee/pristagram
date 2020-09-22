import { prisma } from "../../../generated/prisma-client";

export default {
    Booking:{
        profile: ({id}) => prisma.booking({ id }).profile()
    }
}