import { prisma } from "../../../generated/prisma-client";

export default {
    Owner:{
        shopImages: ({id}) => prisma.owner({id}).shopImages(),
        boxFridge: ({id}) => prisma.owner({id}).boxFridge(),
        fridge: ({id}) => prisma.owner({id}).fridge(),
        fire: ({id}) => prisma.owner({id}).fire(),
        griller: ({id}) => prisma.owner({id}).griller(),
        griddle: ({id}) => prisma.owner({id}).griddle(),
        fryer: ({id}) => prisma.owner({id}).fryer(),
        oven: ({id}) => prisma.owner({id}).oven(),
        cafe: ({id}) => prisma.owner({id}).cafe(),
        electronic: ({id}) => prisma.owner({id}).electronic(),
        tableware: ({id}) => prisma.owner({id}).tableware(),
        container: ({id}) => prisma.owner({id}).container(),
        glass: ({id}) => prisma.owner({id}).glass(),
        serving: ({id}) => prisma.owner({id}).serving(),
        cleaner: ({id}) => prisma.owner({id}).cleaner(),
        ect: ({id}) => prisma.owner({id}).ect(),
    }
}