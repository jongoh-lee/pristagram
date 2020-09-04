import { prisma } from "../../../generated/prisma-client";

export default {
    Post:{
        files: ({ id }) => prisma.post({ id }).files(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        user: ({ id }) => prisma.post({ id }).user(),
        profile: ({ id }) => prisma.post({ id }).profile(),
        likes: ({ id }) => prisma.post({ id }).likes(),
        isLiked: (parent, _, { request }) => {
          const { user } = request;
          const { id } = parent;
          return prisma.$exists.like({
            AND: [
              {
                user: {
                  id: user.id
                }
              },
              {
                post: {
                  id
                }
              }
            ]
          });
        },
        isSelf: async ( parent, _, {request} ) => {
          const { user } = request;
          const { id } = parent;
          const poster = await prisma.post({ id }).user();
          return poster.id === user.id;
        },
        likeCount: parent =>
          prisma
            .likesConnection({
              where: { post: { id: parent.id } }
            })
            .aggregate()
            .count(),
        //commentCount: parent =>
        //  prisma
        //    .commentsConnection({
        //      where: { post: { id: parent.id } }
        //    })
        //    .aggregate()
        //    .count(),
    },
};