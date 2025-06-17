module.exports = function (bot, db) {
  bot.hears('👥 Yönlendirme', async (ctx) => {
    const userId = ctx.from.id;
    const link = `https://t.me/${bot.botInfo.username}?start=${userId}`;
    await ctx.reply(
      `Referans linkinle arkadaşlarını davet et, her referans için 20 CBANK kazan!\n\nSenin linkin:\n${link}`
    );
  });

  // Başlangıçta referans kontrolü
  bot.on('text', async (ctx, next) => {
    if (ctx.message.text && ctx.message.text.startsWith('/start ')) {
      const refId = ctx.message.text.split(' ')[1];
      const userId = ctx.from.id;
      if (refId && refId !== userId.toString()) {
        // Kullanıcı daha önce kayıtlı değilse referans ödülü ver
        const user = await db.collection('users').findOne({ id: userId });
        if (!user || !user.referred) {
          await db.collection('users').updateOne(
            { id: parseInt(refId) },
            { $inc: { balance: 20 } }
          );
          await db.collection('users').updateOne(
            { id: userId },
            { $set: { referred: true } }
          );
        }
      }
    }
    next();
  });
};
