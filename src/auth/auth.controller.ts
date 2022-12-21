import { Body, Controller, Post, NotFoundException, BadRequestException, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
        constructor (
                private userService: UserService,
                private jwtService: JwtService
        ) { }

        @Post("register")
        register(@Body() data: RegisterDto) {
                return this.userService.create(data)
        }


        @Post("login")
        async login(@Body() { email, password }: LoginDto, @Res({ passthrough: true }) response: Response) {
                const user = await this.userService.findOne({ email })

                if (!user) {
                        throw new NotFoundException("User Not Fount")
                }


                if (! await bcrypt.compare(password, user.password)) {
                        throw new BadRequestException("Invalid Password!")
                }


                const token = await this.jwtService.signAsync({ id: user.id }, { secret: "secretKey" })


                return { user, token }

        }
}
