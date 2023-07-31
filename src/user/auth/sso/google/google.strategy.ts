import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      id: profile.id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: profile.photos[0].value,
      locale: profile._json.locale,
      googleId: profile.id,
      password: undefined, // or generate a random password
    };

    // Here we check if the user exists in our database. If it doesn't, we create a new user.
    let userRecord = await this.userService.findUserByEmail(user.email);
    if (!userRecord) {
      userRecord = await this.userService.createUser(user);
    }

    done(null, userRecord);
  }
}
