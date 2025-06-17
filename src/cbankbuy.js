const { Markup } = require('telegraf');
module.exports = function (bot, db) {
  bot.hears('💰 CBANK Satın Al', (ctx) =>
    ctx.reply('CBANK token almak için tıkla: @BlumCryptoBot', { parse_mode: 'Markdown' })
  );
};
