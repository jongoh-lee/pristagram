import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editCalendar: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { updatePrice, createPrice, deletePrice } = args;

            //업데이트 폼
            let _update = updatePrice.map( el => (
                {
                    data: { dateString:el.dateString, priceState: el.priceState},
                    where: { id : el.id }
                }
            ));
            //삭제 폼
            let _delete = [];
            deletePrice.map(el =>  _delete.push({ id: el.id}));

            //아이디 추출
            let _deleteIdList = deletePrice.map(el => el.id);
            let _updateIdList = updatePrice.map(el => el.id);
            
            const bookedDates = await prisma.prices({
                where:{
                    id_in: [..._updateIdList, ..._deleteIdList],
                    isBooked:true
                },
            });

            if(bookedDates?.length > 0){
                throw Error("방금 누군가 공간을 예약했습니다.")
            }else{
                const owner = await prisma.user( { id: user.id }).owner();
                const profile = await prisma.user( { id: user.id }).profile();
                const newOwner = await prisma.updateOwner({
                    where: { id: owner.id },
                    data: {
                        calendar: {
                            updateMany: _update,
                            create: createPrice,
                            deleteMany: _delete
                        },
                    }
                });
                try{
                    //self를 만든경우
                    let createSelf = createPrice.filter(el => el.priceState === 'self');
                    let dateList = [];
                    createSelf.map(el => dateList.push(el.dateString))
                    if(createSelf.length > 0){
                        const bookingList = await prisma.bookings({
                            where:{
                                owner:{
                                    id: owner.id
                                },
                                profile:{
                                    id: profile.id
                                }
                            }
                        });
                        const newPrices = await prisma.prices({
                            where:{
                                owner:{
                                    id: owner.id
                                },
                                dateString_in: dateList
                            }
                        });
                        let priceIdList = [];
                        newPrices.map(el => priceIdList.push({ id : el.id}));
                        if(bookingList.length > 0){
                            await prisma.updateBooking({
                                where: {
                                    id: bookingList[0].id
                                },
                                data:{
                                    prices:{
                                        connect: priceIdList
                                    }
                                }
                            })
                        }else{
                            await prisma.createBooking({
                                owner:{
                                    connect:{
                                        id: owner.id
                                    },
                                },
                                profile:{
                                    connect:{
                                        id: profile.id
                                    }
                                },
                                firstDate: "self",
                                lastDate: "self",
                                totalPrice: "self",
                                prices:{
                                    connect: priceIdList
                                }
                            })
                        }
                    }
                }catch(e){
                    console.log("self 생성 에러",e)
                }

                try{
                    if(updatePrice.length > 0){
                        let selfList = updatePrice.filter(el => el.priceState === 'self')
                        const bookingList = await prisma.bookings({
                            where:{
                                owner:{
                                    id: owner.id
                                },
                                profile:{
                                    id: profile.id
                                }
                            }
                        });
                        if(selfList.length > 0){
                            let priceIdList = [];
                            updatePrice.map(el => priceIdList.push({ id: el.id }))
                            if(bookingList.length > 0){
                                await prisma.updateBooking({
                                    where: {
                                        id: bookingList[0].id
                                    },
                                    data:{
                                        prices:{
                                            connect: priceIdList
                                        }
                                    }
                                })
                            }else{
                                let priceIdList = [];
                                updatePrice.map(el => priceIdList.push({ id: el.id }))
                                await prisma.createBooking({
                                    owner:{
                                        connect:{
                                            id: owner.id
                                        },
                                    },
                                    profile:{
                                        connect:{
                                            id: profile.id
                                        }
                                    },
                                    firstDate: "self",
                                    lastDate: "self",
                                    totalPrice: "self",
                                    prices:{
                                        connect: priceIdList
                                    }
                                })
                            }
                        }else{
                            let allDeleteList = updatePrice.map(el => el.id)
                            const allPrice = await prisma.pricesConnection({
                                where:{
                                    booking:{
                                        id: bookingList[0].id,
                                    },
                                }
                            });
                            let allPriceIds = allPrice.edges.map( el => el.cursor);
                            let deleteList = [];
                            let intersection = allDeleteList.filter( el => allPriceIds.includes(el));
                            intersection.map( el => deleteList.push({ id: el }))
                            await prisma.updateBooking({
                                where: {
                                    id: bookingList[0].id
                                },
                                data: {
                                    prices:{
                                        disconnect: deleteList
                                    }
                                },
                            });
                        }
                    }
                }catch(e){
                    console.log("업데이트 에러",e)
                }

                return newOwner;
            }
        }
    }
}