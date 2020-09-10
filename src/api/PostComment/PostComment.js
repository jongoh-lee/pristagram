import { prisma } from "../../../generated/prisma-client";

export default {
  PostComment: {
    user: ({ id }) => prisma.postComment({ id }).user(),
    post: ({ id }) => prisma.postComment({ id }).post()
  }
};