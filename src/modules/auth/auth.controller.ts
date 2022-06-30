import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './';
import { ForgotPassword, LoginDto, RegisterDto, ResetPassword } from './dto';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { User, UsersService } from './../user';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) { }

    @Post('login')
    @ApiResponse({ status: 201, description: 'Successful Login' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() payload: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(payload);
        return await this.authService.createToken(user);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Successful Registration' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async register(@Body() payload: RegisterDto): Promise<any> {
        const user = await this.userService.create(payload);
        return await this.authService.createToken(user);
    }

    @Post('forgot-password')
    @ApiResponse({ status: 200, description: 'Succesful Request' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async forgotPassword(@Body() payload: ForgotPassword): Promise<any> {
        return await this.authService.forgotPassword(payload);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Put('reset-password')
    @ApiResponse({ status: 201, description: 'Successful Update' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async resetPassword(@Body() payload: ResetPassword, @CurrentUser() user: User): Promise<any> {
        return await this.authService.resetPassword(payload, user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('me')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
        return user;
    }
}