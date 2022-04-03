import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth.model';
import { LoginUserInput } from '../dto/login-user.input';
import { RegisterUserInput } from '../dto/register-user.input';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => Auth)
  async login(@Args() { email, password }: LoginUserInput): Promise<Auth> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Mutation(() => Auth)
  async register(
    @Args()
    credentials: RegisterUserInput,
  ): Promise<Auth> {
    const user = await this.authService.createUser(credentials);
    return this.authService.login(user);
  }
}
