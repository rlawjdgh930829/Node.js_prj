## 소개

Express.js를 이용하여 만든 프로젝트
Heroku를 이용하여 배포(https://node-prj.herokuapp.com/)

## 개발환경

- Node.js
- MongoDB

## 시작방법

1. 프로젝트를 클론
2. 루트경로에서 nodemon.json 파일을 생성
3. nodemon.json 파일에 아래 값을 적용

```
{
  "env": {
    "PORT": "3000",
    "DB_URI": "Your_MongoDB_Uri",
    "STRIPE_KEY": "Your_Stripe_Key"
  }
}
```
