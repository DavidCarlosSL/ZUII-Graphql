import { Container } from 'inversify';
import ArtistResolver from '../graphql/resolvers/artist.resolver';

import UserResolver from '../graphql/resolvers/user.resolver';
import ArtistService from './artist.service';
import UserService from './user.service';

const container = new Container();

container.bind<UserService>("UserService").to(UserService);
container.bind<UserResolver>(UserResolver).toSelf();
container.bind<ArtistService>("ArtistService").to(ArtistService);
container.bind<ArtistResolver>(ArtistResolver).toSelf();

export default container;