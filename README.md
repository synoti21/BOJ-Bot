# BOJ-Bot
<img width="717" alt="스크린샷 2023-08-01 오후 10 52 22" src="https://github.com/synoti21/BOJ-Bot/assets/58936172/12b05920-b39d-423a-9020-d0b440a9982e">

This is a prototype of BOJ Bot with following features.
- Random Recommendation of BOJ problems via discord chat
- Daily notification with a single random BOJ problem
- Streak Guard

Will be further developed in;to "Baekjoon Bot" with BOAZ members.

## Getting Started
### Adding the bot to your server
Click the link below and grant permissions for the bot to join your server:

[Add bot to your server](https://discord.com/api/oauth2/authorize?client_id=1133277476869640212&permissions=18432&scope=bot)


### Running the server locally
Clone this repository and run:
```
git clone https://github.com/synoti21/BOJ_Bot_Backend.git
npm install
```
- Make your application in the discord developer site
- Create .env and fill the value with your discord bot token, and AWS RDS info
- Type `npm run start` to start the bot
