const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const readlineSync = require('readline-sync');
var random = require('random-name')
var randomize = require('randomatic')

const functionSendOtp = (nomor, key) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"SendOtpMutation","variables":{"input":{"mobile":`+62${nomor}`,"purpose":"AUTH","mode":"SMS","skipBusinessCreation":true,"referrerId":1976244},"key":`${key}`},"query":"mutation SendOtpMutation($input: SendOtpInput!) {\n  sendOtp(input: $input) {\n    success\n    __typename\n  }\n}\n"
        }

    fetch('https://api.beecash.io/graphql', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            "accept-language": 'id',
            'x-client-platform': 'android',
            'x-client-version': '0.27.0',
            'Content-Type': 'application/json',
            'Host': 'api.beecash.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/4.2.2'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (otp, nomor, key) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"VerifyOtpMutation","variables":{"input":{"otp":`${otp}`,"mobile":`+62${nomor}`},"key":`${key}`},"query":"mutation VerifyOtpMutation($input: VerifyOtpInput!) {\n  verifyOtp(input: $input) {\n    token\n    user {\n      id\n      mobile\n      sessionsCount\n      businesses {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
        }

    fetch('https://api.beecash.io/graphql', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            "accept-language": 'id',
            'x-client-platform': 'android',
            'x-client-version': '0.27.0',
            'Content-Type': 'application/json',
            'Host': 'api.beecash.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/4.2.2'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    try {
        var nomor = readlineSync.question('[?] NOMOR: ')
        const sendOtp = await functionSendOtp(nomor, uuidv4())
        const otp = readlineSync.question('[?] OTP: ')
        const verifOtp = await functionVerifOtp(otp, nomor, uuidv4())
        const reff = verifOtp.data.verifyOtp.user.id
        console.log(`[+] REFF ${reff}`)
    } catch (e) {
        console.log(e);
    }   
})()