import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from './interface/profile.interface';
import { profileData } from './data/data';

@Injectable()
export class ProfileService {
  private readonly profiles: Profile[] = profileData;

  public getAll(): Profile[] {
    return this.profiles;
  }

  checkIsEmpty(id: string) {
    if (id.trim() === '') {
      throw new BadRequestException('ProfileId field cannot be empty.');
    }
  }

  public checkProfileExists(id: string) {
    const profile = this.profiles.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException(`ProfileId: ${id} Not Found`);
    }
  }
  public getById(id: string): Profile {
    this.checkIsEmpty(id);
    const profile = this.profiles.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException(`ProfileId: ${id} Not Found`);
    }
    return profile;
  }

  public checkProfileIdIsValid(id: string) {
    this.checkIsEmpty(id);
    this.checkProfileExists(id);
  }
}
