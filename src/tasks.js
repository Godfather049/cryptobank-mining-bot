const { Markup } = require('telegraf');
const TASK_LINKS = [
  'https://t.me/blum/app?startapp=ref_M96qo1sLIr',
  'https://t.me/boinker_bot/boinkapp?startapp=boink1463264622',
  'https://t.me/cbankmining',
  'https://t.me/blumcrypto_memepad',
  'https://t.me/theYescoin_bot/Yescoin?startapp=GtNgBb'
];

module.exports = function (bot, db) {
  bot.hears('🎯 Görev', async (ctx) => {
    await ctx.reply(
      `Aşağıdaki görev linklerine tıkla, her görev için 10 CBANK kazan!`,
      Markup.inlineKeyboard(
        TASK_LINKS.map((url, i) => [Markup.button.url(`Görev ${i + 1}`, url)])
      )
    );
    // Otomatik onay için kısa bir bilgi eklenebilir, şimdilik admin kontrolü önerilir.
  });
};
