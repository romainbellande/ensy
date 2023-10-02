import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Configuration } from '@/configuration';

import { Auth0BaseService } from './auth0-base.service';
import { Auth0Role, Auth0User } from './models';

@Injectable()
export class Auth0Service extends Auth0BaseService {
  constructor(
    readonly httpService: HttpService,
    readonly configService: ConfigService<Configuration>,
  ) {
    super(httpService, configService);
  }

  async getUsers(query: string): Promise<Auth0User[]> {
    const { data } = await this.http.get<Auth0User[]>(`/users?q=${query}`);
    return data;
  }

  async getRoles() {
    const { data } = await this.http.get<Auth0Role[]>('/roles');
    return data;
  }
}
