const { Markup } = require('telegraf');

module.exports = function (bot, db) {
  bot.action('premium_mining', async (ctx) => {
    ctx.reply(
      'Premium mining ile 8 saat beklemeden hemen mining yapabilirsin!\n\n1.5 TON göndererek premium ol:',
      Markup.inlineKeyboard([
        [Markup.button.url('Otomatik Premium Ol (1.5 TON)', `https://tonviewer.com/${process.env.ADMIN_TON_WALLET}?amount=1500000000`)]
      ])
    );
    // Premium mining logic, ödeme kontrolü admin veya otomasyon ile yapılır.
  });
};
