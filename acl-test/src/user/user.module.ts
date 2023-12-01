import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Permission } from './entities/permission.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, Permission],
  exports: [UserService, Permission],
})
export class UserModule {}
