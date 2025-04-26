import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService],
  imports: [ProfileModule],
})
export class UserModule {}
