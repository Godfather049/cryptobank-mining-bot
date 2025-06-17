const { Markup } = require('telegraf');

const spinRewards = [
  { label: '0 CB', amount: 0, chance: 30 },
  { label: '5 CB', amount: 5, chance: 30 },
  { label: '10 CB', amount: 10, chance: 20 },
  { label: '30 CB', amount: 30, chance: 10 },
  { label: '50 CB', amount: 50, chance: 9 },
  { label: '1 Gün Premium', amount: 'premium', chance: 1 }
];

function getRandomReward() {
  const rand = Math.random() * 100;
  let sum = 0;
  for (let i = 0; i < spinRewards.length; i++) {
    sum += spinRewards[i].chance;
    if (rand < sum) return spinRewards[i];
  }
  return spinRewards[0];
}

module.exports = function (bot, db) {
  bot.hears('🎰 Spin', async (ctx) => {
    const userId = ctx.from.id;
    const user = await db.collection('users').findOne({ id: userId });
    if ((user.spins || 0) < 1) return ctx.reply('Günlük ücretsiz spin hakkın bitti. Ek spin almak için TON veya CBANK yatırabilirsin.');
    const reward = getRandomReward();
    let msg = `Tebrikler! Kazandığın ödül: <b>${reward.label}</b>`;
    if (reward.amount === 'premium') {
      await db.collection('users').updateOne({ id: userId }, { $set: { premium: true }, $inc: { spins: -1 } });
      msg += '\nHesabın 1 günlüğüne <b>premium</b> oldu!';
    } else {
      await db.collection('users').updateOne({ id: userId }, { $inc: { balance: reward.amount, spins: -1 } });
    }
    ctx.reply(msg, { parse_mode: 'HTML' });
  });

  // Ek spin alma komutları
  bot.command('spinbuy', async (ctx) => {
    const [_, adet] = ctx.message.text.split(' ');
    const count = Number(adet);
    if (![1, 5, 10].includes(count)) return ctx.reply('Geçersiz spin adeti. /spinbuy 1, /spinbuy 5 veya /spinbuy 10 yaz.');
    let fiyat = count === 1 ? 0.1 : count === 5 ? 0.35 : 0.8;
    ctx.reply(
      `Lütfen <b>admin TON cüzdanına</b> <b>${fiyat} TON</b> gönder:\n<code>${process.env.ADMIN_TON_WALLET}</code>\n\nVeya otomatik ödeme için:\n<a href="https://tonviewer.com/${process.env.ADMIN_TON_WALLET}?amount=${fiyat * 1000000000}">Buraya tıkla</a>`,
      { parse_mode: 'HTML', disable_web_page_preview: true }
    );
  });
};
