import { RawAxiosResponseHeaders } from 'axios';

export interface RateLimitConfig {
  limit: number;
  remaining: number;
  reset: number;
}

export class RateLimit {
  constructor(private config: RateLimitConfig) {}

  needToWait(): boolean {
    return this.config.remaining <= 2;
  }

  getTimeToWait(): number {
    return this.config.reset * 1000 - Date.now();
  }

  static fromHeaders(headers: Partial<RawAxiosResponseHeaders>) {
    return new RateLimit({
      limit: Number(headers['x-ratelimit-limit']),
      remaining: Number(headers['x-ratelimit-remaining']),
      reset: Number(headers['x-ratelimit-reset']),
    });
  }
}
