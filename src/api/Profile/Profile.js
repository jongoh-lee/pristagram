import { prisma } from "../../../generated/prisma-client";

export default {
    Profile:{
        //프로필 아이디를 받아서 user 정보 리턴
        user: ({ id }) => prisma.profile({ id }).user(),
        submenus: ({ id }) => prisma.profile({ id }).submenus(),
        members: ({ id }) => prisma.profile({ id }).members(),
        dangols: ({ id }) => prisma.profile({ id }).dangols(),
        isDangol: ( parent, _, {request}) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.dangol({
                // 내 정보(user.id) 중에 팔로잉하는 유저의 정보(parent.id) 
                AND:[
                    {
                        user:{
                            id: user.id
                        }
                    },
                    {
                        profile:{
                            id
                        }
                    }
                ]
            });
        },
        dangolCount: parent =>
          prisma
            .dangolsConnection({
              where: { profile: { id: parent.id } }
            })
            .aggregate()
            .count(),
        posts: ({ id }) => prisma.profile({ id }).posts(),
        isSelf: async ( parent, _, {request} ) => {
            const { user } = request;
            const { id } = parent;
            const profileOwner = await prisma.profile({ id }).user();
            return profileOwner.id === user.id;
        },
    }
};

