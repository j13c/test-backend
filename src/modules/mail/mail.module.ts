import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

//ltjcakvdugdoarhp
const settingMailer: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    service:"gmail",
    auth: {
      user:"testphpjc@gmail.com",
      pass:"ltjcakvdugdoarhp"
    },
  },
  defaults: {
    from: '"No Reply" <noreply@testAluxion.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}

@Module({
  imports: [
    MailerModule.forRoot(settingMailer),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
