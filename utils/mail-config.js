const nodemailer = require('nodemailer');

async function mailSender(name, mailList, subject, mailBody) {
	// let mailLists = [...mailList, 'databackup.central@indianpac.com'];
	let transporter = nodemailer.createTransport({
		host: 'mail.ayubansari.com',
		port: 465,
		secure: true,
		auth: {
			user: 'pesto@ayubansari.com', // generated ethereal user
			pass: '3Dz^XH3$NuPw', // generated ethereal password
		},
	});
	try {
		let info = await transporter.sendMail({
			from: 'Watchflix <test@ayubansari.com>', // sender address
			to: mailList, // list of receivers
			subject: subject, // Subject line
			html: `<p>${mailBody}</p>`, // html body
		});
		// console.log('Message sent: %s', info.messageId);
		return true;
	} catch (error) {
		console.log(error);
		console.log('Email sent failed');
		return false;
	}
}

module.exports = { mailSender };
