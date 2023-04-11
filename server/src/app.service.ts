import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getVersion(): string {
    return '1.0';
  }
}
