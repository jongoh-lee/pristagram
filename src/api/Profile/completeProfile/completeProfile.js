import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeProfile : async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { profileName, region, classification, mainImage, profileState, submenus, members } = args;
            const myProfile = await prisma.user({id : user.id}).profile();
            const profile = await prisma.updateProfile({
                data:{
                profileName,
                region, 
                classification,
                mainImage,
                profileState
                },
                where: { id: myProfile.id}
            });
            submenus.forEach(
                async menu => 
                    await prisma.createSubmenu({
                        ...menu,
                        profile: {
                            connect: {
                                id: myProfile.id
                        }
                    }
                })
            );
            members.forEach(
                async member => 
                    await prisma.createMember({
                        ...member,
                        profile:{
                            connect:{
                                id: myProfile.id
                            }
                        }
                    })
            )
            return profile;
        }
    }
};