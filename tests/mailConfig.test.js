const mailconfig = require('../utils/mail-config');

describe('start test', () => {
	it('if test start', () => {
		expect(1 === 1).toBe(true);
	});

	it('Test Mail Sending', async () => {
		let name = 'Test User';
		let email = 'ayubisthebest@gmail.com';
		let subject = 'This is testing mail';
		let mailBody = 'hello <hr>';
		const mailsend = await mailconfig.mailSender(name, email, subject, mailBody);
		expect(mailsend).toBe(true);
	});
});
