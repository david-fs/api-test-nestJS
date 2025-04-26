import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/getAll')
  getAll() {
    return this.profileService.getAll();
  }

  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.profileService.getById(id);
  }
}
