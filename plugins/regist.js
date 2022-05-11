const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya estás registrado(a).\n_¿Quieres volver a registrarte?_ ${usedPrefix}unreg *SN|NÚMERO DE SERIE*\n\nv`
  if (!Reg.test(text)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nFormato incorrecto\n*${usedPrefix}daftar nombre.edad*\n`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '╰⊱❌⊱ *𝙁𝘼𝙇𝙇𝙊́ | 𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n*El nombre no puede estar vacío.*\nThe name cannot be empty.'
  if (!age) throw '╰⊱❌⊱ *𝙁𝘼𝙇𝙇𝙊́ | 𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n*La edad no puede estar vacía.*\nAge cannot be empty.'
  age = parseInt(age)
  if (age > 120) throw '╰⊱❌⊱ *𝙁𝘼𝙇𝙇𝙊́ | 𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n*Mucha edad 😹*\nVery old 😹'
  if (age < 10) throw '╰⊱❌⊱ *𝙁𝘼𝙇𝙇𝙊́ | 𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n*Es muy poca edad 🙀*\nIt is very young 🙀'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Daftar berhasil!

╭─「 USUARIO(A) | USER 」
│ *Nombre | Name:* ${name}
│ *Edad | Age:* ${age}  
╰────
Serial Number: 
${sn}
`.trim())
}
handler.help = ['registrar | register | reg'].map(v => v + ' nombre.edad')
handler.tags = ['xp']

handler.command = /^(registrar|registar|daftar|reg(ister)?)$/i

module.exports = handler
