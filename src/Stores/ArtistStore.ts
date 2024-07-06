import { model, Model, prop, modelAction } from 'mobx-keystone';
import { Artist } from '../Models/Artist';
import { Album } from '../Models/Album';

@model('myMusicApp/ArtistStore')
export class ArtistStore extends Model({
  artists: prop<Artist[]>(() => []),
}) {
  @modelAction
  addArtist(name: string, surname: string, albums: Album[]) {
    const id = (this.artists.length + 1).toString();
    const newArtist = new Artist({ id, name, surname, albums });
    this.artists.push(newArtist);
  }

  @modelAction
  removeArtist(artist: Artist) {
    const index = this.artists.findIndex((a) => a.id === artist.id);
    if (index !== -1) {
      this.artists.splice(index, 1);
    }
  }
}
