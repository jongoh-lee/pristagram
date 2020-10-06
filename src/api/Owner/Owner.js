import { prisma } from "../../../generated/prisma-client";

export default {
    Owner:{
        shopImages: ({id}) => prisma.owner({id}).shopImages(),
        facility: ({id}) => prisma.owner({id}).facility(),
        calendar: ({id}) => prisma.owner({id}).calendar(),
        isSelf: async ( parent, _, {request} ) => {
            const { user } = request;
            const { id } = parent;
            const owner = await prisma.owner({ id }).user();
            return owner.id === user.id;
        },
        franchiseState:async ( _, __, {request} ) => {
            const { user } = request;
            const profile = await prisma.user({ id: user.id }).profile();
            if(profile){
                return profile.profileState;
            }else{
                return 0
            }
        },
        account: ({id}) => prisma.owner({id}).account()
    }
}