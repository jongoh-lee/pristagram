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
                // exsit는 배열 형태로 전달 => 단골 리스트에 내 정보와 업체 정보가 있는가?
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
        posts: async ({ id }) => {
            let _posts = await prisma.profile({ id }).posts()
            return _posts.reverse()
        },
        isSelf: async ( parent, _, {request} ) => {
            const { user } = request;
            const { id } = parent;
            const profileOwner = await prisma.profile({ id }).user();
            return profileOwner.id === user.id;
        },
        postsCount: ({ id }) =>
        prisma
            .postsConnection({ where: { profile: { id } } })
            .aggregate()
            .count(),
        //내가 쓴 포스트 수
        myPosts: async ( parent, _, {request} ) => {
            const { user } = request;
            const { id } = parent;

            return await prisma
                .postsConnection({ 
                where: {
                        user:{
                            id: user.id
                        },
                        profile:{
                            id
                        }
                    },
                        
                })
                .aggregate()
                .count()
        },
        favorites:({ id }) => prisma.profile({ id }).favorites(),
        bookings:({ id }) => prisma.profile({ id }).bookings(),
        myWallet: async ( parent, _, {request} ) => {
            const { user } = request;
            const { id } = parent;

            const [ wallet ] = await prisma.wallets({ 
                where: {
                    user:{
                        id: user.id
                    },
                    profile:{
                        id
                    }
                },
            })
            return wallet
        },
        wallets: ({ id }) => prisma.profile({ id }).wallets()
    }   
};

