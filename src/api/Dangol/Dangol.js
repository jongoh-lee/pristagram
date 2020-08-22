import { prisma } from "../../../generated/prisma-client";

export default {
  Dangol: {
    user: ({ id }) => prisma.dangol({ id }).user(),
    profile: ({ id }) => prisma.dangol({ id }).profile()
  }
};