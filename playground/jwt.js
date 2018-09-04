const jwt = require('jsonwebtoken');

console.log(jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhlMmFlM2I5Nzc4NDE1ODhmNmM1ZDIiLCJpYXQiOjE1MzYwNDM3NDh9.SMP0Js-HZ3ez4xMD9--Ex-16KmPNRW912Kq5Qp1A8NY",'supersecret'));