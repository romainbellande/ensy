import type { CanActivate, ExecutionContext } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { IncomingHttpHeaders } from 'http';
import type { VerifyOptions } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import jwtDecode from 'jwt-decode';

import type { Auth0Configuration, Configuration } from '@/configuration';
import { NO_AUTH_METADATA } from '@/decorators';
import type { JwtPayload } from '@/interfaces';

import { UserContext } from './../../app/modules/user/user.interfaces';

@Injectable()
export class Auth0Guard implements CanActivate {
  private issuer: string;

  constructor(
    private configService: ConfigService<Configuration>,
    private reflector: Reflector,
  ) {
    const { issuer } = this.configService.get<Auth0Configuration>('auth0');
    this.issuer = issuer;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.hasNoAuth(context)) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<UserContext>().req;
    const { headers } = request;
    const token: string | null = this.extractTokenFromHeader(headers);

    if (!token) {
      console.error('no session present');
      throw new ForbiddenException('no session present');
    }

    await this.verifyToken(token);

    const decodedToken = this.jwtDecode(token);

    console.log('decodedToken :>> ', decodedToken);

    const uid = decodedToken.sub;

    request.user = {
      externalId: uid,
    };

    return true;
  }

  hasNoAuth(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    return this.reflector.get<boolean>(NO_AUTH_METADATA, handler);
  }

  async verifyToken(token: string): Promise<boolean> {
    let kid: string;

    try {
      kid = this.getKid(token);
    } catch (e) {
      throw new BadRequestException(e);
    }

    const signingKey = await this.getSigningKey(kid);

    const verifyOptions: VerifyOptions = {
      issuer: `${this.issuer}/`,
    };

    return new Promise((resolve) =>
      verify(token, signingKey, verifyOptions, (err) => {
        if (err) {
          throw new ForbiddenException(err);
        }

        resolve(true);
      }),
    );
  }

  protected async getSigningKey(kid: string): Promise<string> {
    const jwksClient = new JwksClient({
      jwksUri: `${this.issuer}/.well-known/jwks.json`,
    });

    const signingKey = await jwksClient.getSigningKey(kid);
    return signingKey.getPublicKey();
  }

  protected extractTokenFromHeader(
    headers: IncomingHttpHeaders,
    key = 'authorization',
  ): string | null {
    const authHeader = headers[key] as string;
    const match: RegExpExecArray = /Bearer (.+)/.exec(authHeader);

    if (!match) {
      return null;
    }

    return match[1];
  }

  protected getKid(token: string): string {
    const tokenHeader = jwtDecode<JwtPayload>(token, { header: true });
    return tokenHeader['kid'];
  }

  protected jwtDecode<T = JwtPayload>(token: string) {
    return jwtDecode<T>(token);
  }
}
