import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId, token, profileId, userId } = args;
      const { user } = request;
      const [ wallet ] = await prisma.wallets({
        where:{
          AND: [
            {
                user: {
                    id: userId
                }
            },
            {
                profile: {
                    id: profileId
                }
            }
          ]
        }
      });
      const likeFilterOptions = {
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
        const existingLike = await prisma.$exists.like(likeFilterOptions);
        if (existingLike) {
          //왜 deleteManyLikes를 쓰나요? like의 아이디를 불러오기 귀찮아서
          await prisma.deleteManyLikes(likeFilterOptions);
          await prisma.updateWallet({
            where:{
              id: wallet.id
            },
            data:{
              incoming: wallet.incoming - token
            }
          })
        } else {
          await prisma.updateWallet({
            where:{
              id: wallet.id
            },
            data:{
              incoming: wallet.incoming + token
            }
          })
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            },
          });
        }
        return true;
      } catch(e) {
        console.log(e)
        return false;
      }
    }
  }
};        