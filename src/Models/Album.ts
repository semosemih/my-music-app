import { model, prop, Model, modelAction } from 'mobx-keystone';
import { Song } from './Song';

@model('myMusicApp/Album')
export class Album extends Model({
  id: prop<string>(),
  name: prop<string>(),
  genre: prop<string>(),
  releaseDate: prop<string>(),
  songs: prop<Song[]>(() => []),
}) {
  @modelAction
  addSong(song: Song) {
    this.songs.push(song);
  }
}
