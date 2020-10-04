import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleFavorite: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = args;
            const profile = await prisma.user({id: user.id}).profile();
            if(profile){
                try {
                    const filterOptions = {
                        AND: [
                            {
                                profile: {
                                    id: profile.id
                                }
                            },
                            {
                                owner: {
                                    id: id
                                }
                            }
                        ]
                    };
                    const exist = await prisma.$exists.favorite(filterOptions)
                    if(exist){
                        await prisma.deleteManyFavorites(filterOptions);
                    }else{
                        await prisma.createFavorite({
                            profile:{
                                connect:{
                                    id: profile.id
                                }
                            },
                            owner:{
                                connect:{
                                    id: id
                                }
                            }
                        })
                    }
                    return true
                }catch(e){
                    console.log("즐겨찾기 에러",e);
                    return false
                }
            }else{
                return false
            }
        }
    }
}