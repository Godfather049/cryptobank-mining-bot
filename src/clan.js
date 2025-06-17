const { Markup } = require('telegraf');

module.exports = function (bot, db) {
  bot.hears('🛡️ Klan', async (ctx) => {
    ctx.reply(
      'Kendi kanalını oluştur veya bir klana katılmak için kanalını botunla paylaş!',
      Markup.inlineKeyboard([
        [Markup.button.url('Kanalını Oluştur', 'https://t.me/BotFather')],
        [Markup.button.url('Klan Ara', 'https://t.me/search')]
      ])
    );
  });
};
