import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
// 토크화 해주는 모듈
import jwt from "jsonwebtoken";


export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//검증 후 이메일 전송
const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

//이메일 생성 및 전송
export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "푸드인사이드 <ljo.ceo@foodinside.net>",
    to: adress,
    subject: "로그인 인증키🔑",
    html: `안녕하세요! 푸드인사이드 로그인 인증 키는 <strong>${secret}</strong><br/>입니다. 안전한 로그인을 위해 정확한 키를 입력해 주세요`
  };
  return sendMail(email);
};

// passport를 이용해 id를 jwt에 삽입 합니다. 이때 비밀 번호가 필요 합니다.
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);