import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, User } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() body: any): Promise<any> {
    console.log(body);
    return this.appService.getName(body);
  }

  @MessagePattern({ cmd: 'ms_user' })
  async handleMessage(@Payload() message: any) {
    console.log(message);

    return 'Mensaje recibido correctamente';
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
    return this.appService.pushUser(body);
  }
}
