import { Container } from 'inversify';
import AlbumResolver from '../graphql/resolvers/album.resolver';

import ArtistResolver from '../graphql/resolvers/artist.resolver';
import LibraryResolver from '../graphql/resolvers/library.resolver';
import PurchaseResolver from '../graphql/resolvers/purchase.resolver';

import UserResolver from '../graphql/resolvers/user.resolver';
import AlbumService from './album.service';
import ArtistService from './artist.service';
import LibraryService from './library.service';
import PurchaseService from './purchase.service';
import TrackService from './track.service';
import UserService from './user.service';

const container = new Container();

container.bind<UserService>("UserService").to(UserService);
container.bind<UserResolver>(UserResolver).toSelf();
container.bind<ArtistService>("ArtistService").to(ArtistService);
container.bind<ArtistResolver>(ArtistResolver).toSelf();
container.bind<AlbumService>("AlbumService").to(AlbumService);
container.bind<AlbumResolver>(AlbumResolver).toSelf();
container.bind<LibraryService>("LibraryService").to(LibraryService);
container.bind<LibraryResolver>(LibraryResolver).toSelf();
container.bind<PurchaseService>("PurchaseService").to(PurchaseService);
container.bind<PurchaseResolver>(PurchaseResolver).toSelf();
container.bind<TrackService>("TrackService").to(TrackService);

export default container;