import { prisma } from "../../../generated/prisma-client";

export default {
    Profile:{
        //프로필 아이디를 받아서 user 정보 리턴
        user: ({ id }) => prisma.profile({ id }).user(),
    }
};

