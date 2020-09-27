import { sendReservationCancelMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AT;
const client = require('twilio')(accountSid, authToken);

export default {
    Mutation:{
        cancelBooking: async(_, args,) => {
            const { ownerId, bookingId, dateList, refundPrice, contact, fullName} = args;
            try{
            //문자 + 이메일 보내기
            await client.messages
                    .create({
                       body: `[푸드 인사이드]음식점 예약이 취소되었습니다.`, 
                       from: '+12172921787',
                       to: `+82${contact}`
                     })
                    .then(async message => {
                        await sendReservationCancelMail(fullName, refundPrice); 
                        console.log(message)
                    });
            //isBooked = false로 변경
            await prisma.updateOwner({
                where:{
                    id: ownerId
                },
                data:{
                    calendar:{
                        updateMany:{
                            where:{
                                dateString_in: dateList,
                            },
                            data:{
                                isBooked:false
                            }
                        }
                    },
                }
            });
            //예약 생성
            const booking = await prisma.updateBooking({
                where:{
                    id: bookingId
                },
                data:{
                    isCancelled:true,
                    refundPrice
                }
            });
            return booking;
        }catch(e){
            throw Error("예약 취소 에러")
        }
        }
    }
};