import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export type User = any;
@Injectable()
export class AppService {
  constructor(@Inject('RABBIT_MQ') private client: ClientProxy) {}

  private readonly users = [
    {
      uuid: '903bfe84-efbc-47c9-855f-bbfbf1132306',
      username: 'john',
    },
    {
      uuid: '12ee0ff3-135c-4556-930d-5db1595c1a80',
      username: 'maria',
    },
  ];
  async getName(name: any): Promise<Observable<any>> {
    return await this.client.emit('ms_reserve', name).toPromise(); //-> 200
    // return await this.client.emit('ms_property', name).toPromise();
  }

  async getUserByUUID(params: any): Promise<User | undefined> {
    const user = this.users.find((user) => user.uuid === params.uuid);
    return user ?? null;
  }

  getUserAll(): any {
    return this.users;
  }

  pushUser(user: User): any {
    user.uuid = uuidv4();
    this.users.push(user);
    return user;
  }
}
