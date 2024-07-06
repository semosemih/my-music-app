import { model, Model, prop, modelAction } from 'mobx-keystone';
import { Album } from './Album';

@model('myMusicApp/Artist')
export class Artist extends Model({
  id: prop<string>(),
  name: prop<string>(),
  surname: prop<string>(),
  albums: prop<Album[]>(() => []),
}) {
  @modelAction
  addAlbum(album: Album) {
    this.albums.push(album);
  }

  @modelAction
  removeAlbum(album: Album) {
    const index = this.albums.findIndex((a) => a.id === album.id);
    if (index !== -1) {
      this.albums.splice(index, 1);
    }
  }
}
