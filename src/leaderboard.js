module.exports = function (bot, db) {
  bot.hears('🏆 Lider Tablo', async (ctx) => {
    const top = await db.collection('users').find().sort({ balance: -1 }).limit(100).toArray();
    let msg = '🏆 Lider Tablo (ilk 100):\n';
    top.forEach((u, i) => {
      msg += `${i + 1}. ${u.username || u.id} - ${u.balance} CB\n`;
    });
    const user = await db.collection('users').findOne({ id: ctx.from.id });
    if (!top.find(u => u.id === ctx.from.id)) {
      msg += `\n100+. ${user.username || user.id} - ${user.balance} CB`;
    }
    ctx.reply(msg);
  });
};
