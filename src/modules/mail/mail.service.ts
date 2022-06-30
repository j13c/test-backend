import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendResetPassword(user: User, link: string) {
        const url = `${link}`;

        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Test Aluxion! Reset Your Password',
            template: './reset-password',
            context: { 
                name: user.firstName,
                url,
            },
        });
    }
}
