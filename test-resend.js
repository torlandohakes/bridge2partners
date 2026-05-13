const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY || 're_3SyUPTLJ_Gbjcs7R62BtD7gfvfsuFHVEi');

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'Bridge2Partners Web <onboarding@resend.dev>',
    to: 'torlando.hakes@bridge2partners.com',
    subject: 'Test email',
    html: '<p>Test</p>'
  });

  if (error) {
    console.log("RESEND ERROR:", error);
  } else {
    console.log("RESEND SUCCESS:", data);
  }
}

test();
