import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SameAs } from 'src/modules/common/validator/same-as.validator.decorator';

export class ForgotPassword {
    @ApiProperty({
        required: true,
    })
    @IsEmail()
    email: string;
}

export class ResetPassword {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiProperty({ required: true })
    @SameAs('password')
    passwordConfirmation: string;
}