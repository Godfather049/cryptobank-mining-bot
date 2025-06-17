const { Markup } = require('telegraf');
const storeItems = [
  { name: 'CBANK Free Vize', cb: 20000, ton: 0 },
  { name: 'CBANK Classic Vize', cb: 100000, ton: 1 },
  { name: 'CBANK Gold Vize', cb: 1000000, ton: 2.5 },
  { name: 'CBANK Premium Vize', cb: '∞', ton: 5 }
];

module.exports = function (bot, db) {
  bot.hears('🛒 Mağaza', async (ctx) => {
    let msg = 'Visa Kartlar:\n';
    storeItems.forEach(item => {
      msg += `\n${item.name} — Limit: ${item.cb} CBANK, Fiyat: ${item.ton} TON`;
    });
    ctx.reply(msg, Markup.inlineKeyboard([
      [Markup.button.url('Admin TON Cüzdanına Öde', `https://tonviewer.com/${process.env.ADMIN_TON_WALLET}`)]
    ]));
  });
};
