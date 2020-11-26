const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const readlineSync = require('readline-sync');
var random = require('random-name');
const { send } = require('process');
//1976244
const functionSendOtp = (nomor, key, reff) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"SendOtpMutation","variables":{"input":{"mobile":`+62${nomor}`,"purpose":"AUTH","mode":"SMS","skipBusinessCreation":true,"referrerId":reff},"key":`${key}`},"query":"mutation SendOtpMutation($input: SendOtpInput!) {\n  sendOtp(input: $input) {\n    success\n    __typename\n  }\n}\n"
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

const functionAddHutang = (time, key, token, bisnisId, nama) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"CreateContactMutation","variables":{"input":{"businessId":`${bisnisId}`,"name":nama,"mobile":null,"createdAt":`${time}`,"updatedAt":`${time}`},"key":`${key}`},"query":"mutation CreateContactMutation($input: CreateContactInput!, $key: String!) {\n  createContact(input: $input, key: $key) {\n    id\n    businessId\n    name\n    mobile\n    dueDate\n    balanceReceivable\n    creditEntriesCount\n    transactionEntriesCount\n    creditShareKey\n    createdAt\n    updatedAt\n    notify\n    __typename\n  }\n}\n"
        }

    fetch('https://api.beecash.io/graphql', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'x-token': token,
            "accept-language": 'id',
            'x-client-platform': 'android',
            'x-client-version': '0.27.0',
            'Content-Type': 'application/json',
            'Content-Length': 595,
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

const functionBuka = (nomor, key, token) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"CreateBusinessMutation","variables":{"input":{"mobile":`+62${nomor}`,"name":"Pulsa","businessCategoryId":"18","notes":null},"key":`${key}`},"query":"mutation CreateBusinessMutation($input: CreateBusinessInput!) {\n  createBusiness(input: $input) {\n    id\n    name\n    mobile\n    __typename\n  }\n}\n"
        }

    fetch('https://api.beecash.io/graphql', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'x-token': token,
            "accept-language": 'id',
            'x-client-platform': 'android',
            'x-client-version': '0.27.0',
            'Content-Type': 'application/json',
            'Content-Length': 595,
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

const functionNominal = (kontak, time, key, token, bisnisId) => new Promise((resolve, reject) => {
    const bodys = {
        "operationName":"CreateCreditEntryMutation","variables":{"input":{"kind":"receivable","date":"2020-11-26","amount":935304,"businessId":bisnisId,"contactId":kontak,"createdAt":time,"updatedAt":time,"notes":null},"key":key},"query":"mutation CreateCreditEntryMutation($input: CreateCreditEntryInput!, $key: String!) {\n  createCreditEntry(input: $input, key: $key) {\n    id\n    contactId\n    kind\n    amount\n    date\n    createdAt\n    updatedAt\n    notes\n    transactionEntry {\n      ...transactionEntry\n      __typename\n    }\n    contact {\n      id\n      name\n      mobile\n      dueDate\n      balanceReceivable\n      creditEntriesCount\n      transactionEntriesCount\n      creditShareKey\n      createdAt\n      updatedAt\n      __typename\n    }\n    image {\n      url\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment transactionEntry on TransactionEntry {\n  id\n  saleAmount\n  purchaseAmount\n  date\n  notes\n  createdAt\n  updatedAt\n  paymentMethod\n  paymentStatus\n  salesChannel\n  image {\n    originalFilename\n    url\n    __typename\n  }\n  lineItems {\n    id\n    name\n    quantity\n    __typename\n  }\n  contact {\n    id\n    name\n    mobile\n    __typename\n  }\n  transactionEntryCategory {\n    id\n    name\n    imageUrl\n    __typename\n  }\n  creditEntries {\n    id\n    __typename\n  }\n  __typename\n}\n"
        }

    fetch('https://api.beecash.io/graphql', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': '*/*',
            'x-token': token,
            "accept-language": 'id',
            'x-client-platform': 'android',
            'x-client-version': '0.27.0',
            'Content-Type': 'application/json',
            'Content-Length': 595,
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
    const reff = parseInt(readlineSync.question('[?] Reff: '))
    for (var j = 0; j < 10; j++){
    try {
        var time = new Date().toISOString()
        var nomor = readlineSync.question('[?] NOMOR: ')
        const sendOtp = await functionSendOtp(nomor, uuidv4(), reff)
        if (sendOtp.data.sendOtp.success == true){
            console.log('[+] OTP berhasil dikirim !')
            const otp = readlineSync.question('[?] OTP: ')
            const verifOtp = await functionVerifOtp(otp, nomor, uuidv4())
            var token = verifOtp.data.verifyOtp.token
            if (verifOtp.data.verifyOtp.token != ''){
                console.log('[+] Sukses Login !')
                const buka = await functionBuka(nomor, uuidv4(), token)
                var bisnisId = buka.data.createBusiness.id
                for (var i = 0; i < 11; i++){
                    console.log('[+] Mencoba membuat catatan !')
                    const nama = random.first()
                    const hutang = await functionAddHutang(time, uuidv4(), token, bisnisId, nama)
                    const kontak = hutang.data.createContact.id
                    const nom = await functionNominal(kontak, time, uuidv4(), token, bisnisId)
                    if (hutang.data.createContact.id != '' && nom.data.createCreditEntry.id != ''){
                        console.log(`[+] SUKSES => ${i+1}`)
                    } else {
                        console.log(`[!] GAGAL => ${i+1}`)
                    }
                }
            } else {
                console.log('[!] OTP salah !')
            }
        } else {
            console.log('[!] OTP gagal dikirim !')
        }
    } catch (e) {
        console.log(e);
}
    }   
})()
