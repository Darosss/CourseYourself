import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  //TODO: replace any with UserRequest?...
  async validate(payload: any): Promise<UserRequestPayload> {
    return { id: payload.id, isAdmin: payload.isAdmin, email: payload.email };
  }
}
