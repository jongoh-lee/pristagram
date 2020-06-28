import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          //왜 deleteManyLikes를 쓰나요? like의 아이디를 불러오기 귀찮아서
          await prisma.deleteManyLikes(filterOptions);
        } else {
          await prisma.createLike({
            user: {
              //이 connect는 뭔가요?
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch(e) {
        return false;
      }
    }
  }
};
          