import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        completeProfile : async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { profileName, sector, token, founderImage, mainImage, foodGuide, origin, fullPrice, createMenus, editMenus, deleteMenus, createMembers, editMembers, deleteMembers, profileState } = args;
            const myProfile = await prisma.user({id : user.id}).profile();
            let _createMenus = createMenus.map( el => (
                {
                    menuImage : el.menuImage,
                    menuName : el.menuName,
                    fullPrice : el.fullPrice,
                    salePrice : el.salePrice,
                }
            ));
            let _editMenus = editMenus.map( el => (
                {
                    data: {
                        menuImage : el.menuImage,
                        menuName : el.menuName,
                        fullPrice : el.fullPrice,
                        salePrice : el.salePrice,
                    },
                    where: { id: el.id }
                }
            ));
            let _deleteMenus = deleteMenus.map( el => ( { id: el.id }));

            let _createMembers = createMembers.map( el => (
                {
                    image : el.image,
                    name : el.name,
                    position : el.position,
                    career : el.career,
                }
            ));
            let _editMembers = editMembers.map( el => (
                {
                    data: {
                        image : el.image,
                        name : el.name,
                        position : el.position,
                        career : el.career,
                    },
                    where: { id: el.id }
                }
            ));
            let _deleteMembers = deleteMembers.map( el => ( { id: el.id }));
            const profile = await prisma.updateProfile({
                where: { id: myProfile.id},
                data:{
                    profileName,
                    sector,
                    token,
                    mainImage,
                    foodGuide, 
                    origin, 
                    fullPrice,
                    profileState,
                    founderImage,
                    submenus: {
                        updateMany: _editMenus,
                        create: _createMenus,
                        deleteMany: _deleteMenus
                    },
                    members: {
                        updateMany: _editMembers,
                        create: _createMembers,
                        deleteMany: _deleteMembers
                    }
                },
            });
            return profile;
        }
    }
};