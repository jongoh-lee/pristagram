import { prisma } from "../../../generated/prisma-client";

export default {
    Post:{
        files: ({ id }) => prisma.post({ id }).files(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        user: ({ id }) => prisma.post({ id }).user(),
        likes: ({ id }) => prisma.post({ id }).likes(),
        //내 좋아요 중에 상대방 포스트가 있나요? ID를 가지고 있다
        isLiked:(parent,_, {request}) => {
            const {user} = request;
            const { id } = parent;
            return prisma.$exists.likes({
                AND:[
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post:{
                            id
                        }
                    }
                ]
            });
        }
    }
};