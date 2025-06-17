const { Markup } = require('telegraf');

const tonWallets = [
  {
    name: 'Telegram Wallet',
    url: 'https://t.me/wallet'
  },
  {
    name: 'Tonkeeper',
    url: 'https://tonkeeper.com/ton-connect'
  },
  {
    name: 'MyTonWallet',
    url: 'https://mytonwallet.org/ton-connect'
  },
  {
    name: 'Tonhub',
    url: 'https://tonhub.com/ton-connect'
  },
  {
    name: 'OpenMask',
    url: 'https://openmask.app/ton-connect'
  }
];

module.exports = function (bot, db) {
  bot.hears('💸 TON Satın Al', async (ctx) => {
    await ctx.reply(
      'Aşağıdaki cüzdanlardan birini seçerek TON hesabını bağlayabilir veya otomatik TON gönderebilirsin:',
      Markup.inlineKeyboard([
        ...tonWallets.map(wallet => [Markup.button.url(wallet.name, wallet.url)]),
        [Markup.button.url('Otomatik TON Gönder', `https://tonviewer.com/${process.env.ADMIN_TON_WALLET}?amount=100000000`)]
      ])
    );
  });
};
