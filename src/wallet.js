const { Markup } = require('telegraf');

module.exports = function (bot, db) {
  bot.hears('👛 Cüzdan', async (ctx) => {
    const userId = ctx.from.id;
    const user = await db.collection('users').findOne({ id: userId });
    const balance = user?.balance || 0;
    ctx.reply(
      `Cüzdan Bakiyen: <b>${balance} CBANK</b>\n\nTON veya CBANK almak için butonları kullan. TON’u admin cüzdanına otomatik gönderebilirsin!`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.url('Telegram Wallet', 'https://t.me/wallet')],
          [Markup.button.url('Tonkeeper', 'https://tonkeeper.com/ton-connect')],
          [Markup.button.url('TON Admin\'e Otomatik Gönder', `https://tonviewer.com/${process.env.ADMIN_TON_WALLET}?amount=100000000`)],
          [Markup.button.url('CBANK Satın Al', 'https://t.me/BlumCryptoBot')]
        ])
      }
    );
  });
};
