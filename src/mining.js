const { Markup } = require('telegraf');

module.exports = function (bot, db) {
  // Ana sayfa ve mining başlat
  bot.start(async (ctx) => {
    const userId = ctx.from.id;
    let user = await db.collection('users').findOne({ id: userId });
    if (!user) {
      await db.collection('users').insertOne({ id: userId, balance: 0, lastMining: 0, premium: false, spins: 1, referrals: [] });
      user = await db.collection('users').findOne({ id: userId });
    }
    await ctx.replyWithPhoto(
      { url: 'https://i.ibb.co/3m6GkV7/cb-logo.png' },
      {
        caption: `👋 Hoşgeldin <b>${ctx.from.first_name}</b>!\n\nCBANK Mining başlasın!`,
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('⛏️ Madenciliği Başlat', 'mining_start')],
          [Markup.button.callback('⭐ Premium Mining', 'premium_mining')]
        ])
      }
    );
    await ctx.reply(
      `Bakiyen: <b>${user.balance || 0} CBANK</b>\n\n⏳ 8 saatlik mining = 120 CBANK`,
      {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['🏠 Ev', '🎰 Spin', '👥 Yönlendirme'],
          ['👛 Cüzdan', '🎯 Görev', '🏆 Lider Tablo', '🛡️ Klan'],
          ['🛒 Mağaza', '💰 CBANK Satın Al', '💸 TON Satın Al']
        ]).resize()
      }
    );
  });

  // Mining başlat
  bot.action('mining_start', async (ctx) => {
    const userId = ctx.from.id;
    const user = await db.collection('users').findOne({ id: userId });
    const now = Date.now();
    const left = 8 * 60 * 60 * 1000 - (now - (user.lastMining || 0));
    if (user.lastMining && left > 0) {
      const hours = Math.floor(left / (1000 * 60 * 60));
      const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((left % (1000 * 60)) / 1000);
      return ctx.reply(`⏳ Geri sayım: <b>${hours} saat ${minutes} dakika ${seconds} saniye</b> kaldı.`, { parse_mode: 'HTML' });
    }
    await db.collection('users').updateOne(
      { id: userId },
      { $inc: { balance: 120 }, $set: { lastMining: now } }
    );
    ctx.reply('🎉 <b>120 CB hesabına eklendi!</b>', { parse_mode: 'HTML' });
  });
};
