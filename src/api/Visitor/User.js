import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        dangols: ({ id }) => prisma.user({ id }).dangols(),
        dangolCount: ({ id }) => 
          prisma
            .dangolsConnection({ where: { user: { id } }})
            .aggregate()
            .count(),

        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        followingCount: ({ id }) =>
          prisma
            .usersConnection({ where: { followers_some: { id } } })
            .aggregate()
            .count(),
        followersCount: ({ id }) =>
          prisma
            .usersConnection({ where: { following_some: { id } } })
            .aggregate()
            .count(),

        rooms: ({ id }) => prisma.user({ id }).rooms(),
        posts: async ({ id }) => {
            let _posts = await prisma.user({ id }).posts({orderBy:"createdAt_DESC", first:15})
            return _posts
        },
        likes: ({ id }) => prisma.user({ id }).likes(),
        postComments: ({ id }) => prisma.user({ id }).postComments(),
        postsCount: ({ id }) =>
          prisma
            .postsConnection({ where: { user: { id } } })
            .aggregate()
            .count(),
        fullName: parent => {
         return `${parent.lastName} ${parent.firstName}`;
        },
        isFollowing: async ( parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            try{
                return prisma.$exists.user({
                    // 내 정보(user.id) 중에 팔로잉하는 유저의 정보(parent.id) 
                    AND:[
                        {
                            id:user.id
                        },
                        {
                            following_some:{
                                id:parentId
                            }
                        }
                    ]
                });

            }catch(e){
                return false;
            }
        },
        isSelf: ( parent, _, {request} ) => {
            const { user } = request;
            const { id:parentId } = parent;
            return user.id === parentId;
        },
        wallets: ({ id }) => prisma.user({ id }).wallets()
    }
};