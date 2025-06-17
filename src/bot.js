require('dotenv').config();
const { Telegraf } = require('telegraf');
const { MongoClient } = require('mongodb');

const mining = require('./mining');
const spin = require('./spin');
const tasks = require('./tasks');
const referral = require('./referral');
const wallet = require('./wallet');
const cbankbuy = require('./cbankbuy');
const tonbuy = require('./tonbuy');
const leaderboard = require('./leaderboard');
const clan = require('./clan');
const premium = require('./premium');
const store = require('./store');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const MONGO_URI = process.env.MONGO_URI;

const bot = new Telegraf(BOT_TOKEN);

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    mining(bot, db);
    spin(bot, db);
    tasks(bot, db);
    referral(bot, db);
    wallet(bot, db);
    cbankbuy(bot, db);
    tonbuy(bot, db);
    leaderboard(bot, db);
    clan(bot, db);
    premium(bot, db);
    store(bot, db);
    bot.launch();
    console.log('CBANK Mining Bot çalışıyor!');
  })
  .catch(e => console.error("MongoDB bağlantı hatası:", e));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
