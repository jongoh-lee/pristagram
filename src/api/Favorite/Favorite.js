import { prisma } from "../../../generated/prisma-client";

export default {
  Favorite: {
    owner: ({ id }) => prisma.favorite({ id }).owner(),
    profile: ({ id }) => prisma.favorite({ id }).profile()
  }
};