import { Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('/profile')
    getProfile() {

    }

    @Patch('/password')
    changePassword() {

    }

    @Patch('/bio')
    updateBio() {

    }

    @Patch('/email')
    updateEmail() {

    }

    @Patch('/tags')
    updateTags() {
        
    }
}
