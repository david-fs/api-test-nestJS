import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserDto } from './dtos/user.dto';
import { userData } from './data/data';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(private readonly profileService: ProfileService) {}
  private userList: User[] = userData;

  generateIdWithTimestamp(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).slice(2, 8);
    return `${timestamp}-${randomPart}`;
  }

  getItemIndex(id: string): number {
    if (id.trim() === '') {
      throw new BadRequestException('Id field cannot be empty.');
    }

    const index = this.userList.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return index;
  }

  getUser(): User[] {
    return this.userList;
  }

  getUsers(userId?: string, profileId?: string): User[] {
    let response: User[] = this.userList;

    if (userId) {
      response = response.filter((user) => user.id.includes(userId));
    }
    if (profileId) {
      response = response.filter((user) => user.profileId.includes(profileId));
    }

    return response;
  }

  createUser(createUserDto: UserDto): User {
    this.profileService.checkProfileIdIsValid(createUserDto.profileId);

    const id = this.generateIdWithTimestamp();
    const newUser: User = { ...createUserDto, id };
    this.userList.push(newUser);
    return newUser;
  }

  updateUser(id: string, user: UserDto) {
    const index = this.getItemIndex(id);
    this.profileService.checkProfileIdIsValid(user.profileId);

    const editedUser = { ...user, id };

    this.userList.splice(index, 1, editedUser);
    return editedUser;
  }

  activeUser(id: string) {
    const index = this.getItemIndex(id);
    this.userList[index].isActive = !this.userList[index].isActive;

    return this.userList[index];
  }

  deleteUser(id: string) {
    const index = this.getItemIndex(id);

    this.userList.splice(index, 1);

    return;
  }
}
