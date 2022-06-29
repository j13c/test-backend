import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SameAs } from './../../common/validator/same-as.validator.decorator'; 
/* import { Unique } from './../common';
import { User } from '../../user';
*/
export class RegisterDto {
    @ApiProperty({
        required: true,
    })
    /*@Unique([User]) */
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    lastName: string;

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