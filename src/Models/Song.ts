import { model, Model, prop } from 'mobx-keystone';

@model('myMusicApp/Song')
export class Song extends Model({
  id: prop<string>(),
  name: prop<string>(),
  duration: prop<number>(),
}) {}
