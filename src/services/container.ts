import { Container } from 'inversify';

import UserResolvers from '../graphql/resolvers/user.resolver';
import UserService from './user.service';

const container = new Container();

container.bind<UserService>("UserService").to(UserService);
container.bind<UserResolvers>(UserResolvers).toSelf();

export default container;