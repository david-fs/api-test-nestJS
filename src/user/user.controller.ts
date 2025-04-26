import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  getAll() {
    return this.userService.getUser();
  }

  @Get('/getUsers')
  getUsers(
    @Query('profileId') profileId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.userService.getUsers(userId, profileId);
  }

  @Post('/create')
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() user: UserDto) {
    return this.userService.updateUser(id, user);
  }

  @Patch('/active/:id')
  active(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
