import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        completeShopFacility: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { boxFridge, fridge, fire, griller, griddle, fryer, oven, cafe, electronic, tableware, container, glass, serving, cleaner, ect, } = args;
            const owner = await prisma.user({id : user.id}).owner();
            const facilities = await prisma.$exists.cafe({ owner: {id: owner.id}});
            if(!facilities){
                await prisma.createBoxFridge({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createFridge({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createFire({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createGriddle({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createGriller({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createFryer({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createOven({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createCafe({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createElectronic({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createTableware({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createContainer({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createGlass({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createServing({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createCleaner({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
                await prisma.createEct({
                    owner: {
                        connect: {id : owner.id}
                    }
                });
            }
            
            const newOwner = await prisma.updateOwner({
                where: { id: owner.id},
                data: {
                    boxFridge: {
                        update:{
                            ...boxFridge
                        }
                    },
                    fridge: {
                        update:{
                            ...fridge
                        }
                    },
                    fire: {
                        update:{
                            ...fire
                        }
                    },
                    griller: {
                        update:{
                            ...griller
                        }
                    },
                    griddle: {
                        update:{
                            ...griddle
                        }
                    },
                    fryer: {
                        update:{
                            ...fryer
                        }
                    },
                    oven: {
                        update:{
                            ...oven
                        }
                    },
                    cafe: {
                        update:{
                            ...cafe
                        }
                    },
                    electronic: {
                        update:{
                            ...electronic
                        }
                    },
                    tableware: {
                        update:{
                            ...tableware
                        }
                    },
                    container: {
                        update:{
                            ...container
                        }
                    },
                    glass: {
                        update:{
                            ...glass
                        }
                    },
                    serving: {
                        update:{
                            ...serving
                        }
                    },
                    cleaner: {
                        update:{
                            ...cleaner
                        }
                    },
                    ect: {
                        update:{
                            ...ect
                        }
                    }
                }
            });
            return newOwner
        }
    }
}