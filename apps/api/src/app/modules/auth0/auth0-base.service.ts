import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  AxiosInstance,
} from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { Auth0Configuration, Configuration } from '@/configuration';

import { AccessToken } from './models';

export class Auth0BaseService {
  config: Auth0Configuration;
  protected http: AxiosInstance;
  accessToken?: string;
  exp?: number;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService<Configuration>,
  ) {
    this.config = this.configService.get('auth0');

    this.http = this.httpService.axiosRef;

    this.http.interceptors.request.use(async (req) => {
      await this.ensureAccessTokenValid();
      req.headers.Authorization = `Bearer ${this.accessToken}`;
      return req;
    });
  }

  async getAccessToken() {
    const { clientId, clientSecret, issuer } = this.config;

    const { data } = await this.http.post<AccessToken>('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: `${issuer}/api/v2/`,
    });

    return data;
  }

  private decodeAccessToken(accessToken: string): JwtPayload {
    return jwtDecode<JwtPayload>(accessToken);
  }

  isAccessTokenValid(): boolean {
    return this.accessToken && this.exp && new Date(this.exp) > new Date();
  }

  async ensureAccessTokenValid() {
    if (!this.isAccessTokenValid()) {
      const { access_token } = await this.getAccessToken();
      this.accessToken = access_token;
      this.exp = this.decodeAccessToken(access_token).exp;
    }
  }
}
