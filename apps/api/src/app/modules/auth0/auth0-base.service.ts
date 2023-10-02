import { HttpService } from '@nestjs/axios';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { Auth0Configuration, Configuration } from '@/configuration';

import { AccessToken } from './models';
import { RateLimit } from './rate-limit.interface';

export class Auth0BaseService {
  static expMarginInMs = 15000;
  config: Auth0Configuration;
  protected http: AxiosInstance;
  accessToken?: string;
  exp?: number;
  rateLimit: RateLimit;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService<Configuration>,
  ) {
    this.config = this.configService.get('auth0');

    this.http = this.httpService.axiosRef;

    this.http.interceptors.request.use(async (config) => {
      if (this.rateLimit.needToWait()) {
        throw new HttpException('too many requests', 429);
      }
      const accessToken = await this.getValidAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    this.http.interceptors.response.use((response) => {
      const { headers } = response;
      this.rateLimit = RateLimit.fromHeaders(headers);
      return response;
    });
  }

  async getAccessToken() {
    const { clientId, clientSecret, issuer } = this.config;
    const http = axios.create({
      baseURL: issuer,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const { data } = await http.post<AccessToken>(`/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: `${issuer}/api/v2/`,
      });

      console.log('data :>> ', data);

      return data;
    } catch (error) {
      throw new InternalServerErrorException(JSON.stringify(error));
    }
  }

  private decodeAccessToken(accessToken: string): JwtPayload {
    return jwtDecode<JwtPayload>(accessToken);
  }

  isAccessTokenValid(): boolean {
    return (
      this.accessToken &&
      this.exp &&
      new Date(this.exp - Auth0BaseService.expMarginInMs) > new Date()
    );
  }

  async getValidAccessToken() {
    if (!this.isAccessTokenValid()) {
      const { access_token } = await this.getAccessToken();
      this.accessToken = access_token;
      this.exp = this.decodeAccessToken(access_token).exp * 1000;
    }

    return this.accessToken;
  }
}
