import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('RABBIT_MQ') private client: ClientProxy) {}

  async getName(name: any): Promise<Observable<any>> {
    return await this.client.emit('ms_reserve', name).toPromise(); //-> 200
    // return await this.client.emit('ms_property', name).toPromise();
  }
}
