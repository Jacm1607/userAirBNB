import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, User } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() body: any): Promise<any> {
    console.log(body);
    return this.appService.getName(body);
  }

  @Get('/user/:uuid')
  findUserByUUID(@Param() uuid: string): Promise<User> {
    return this.appService.getUserByUUID(uuid);
  }

  @Get('/users')
  getUserAll(): void {
    return this.appService.getUserAll();
  }

  @Post('/user')
  createUser(@Body() body: any): Promise<User> {
    console.log(body);
    return this.appService.pushUser(body);
  }
}
