import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { ArtistStore } from './Stores/ArtistStore';
import { Artist } from './Models/Artist';
import { Album } from './Models/Album';
import { Song } from './Models/Song';
import data from './data.json';

const artists = data.artists.map((artistData) => {
  const albums = artistData.albums.map((albumData) => {
    const songs = albumData.songs.map((songData) => new Song({
      id: songData.id,
      name: songData.name,
      duration: songData.duration,
    }));

    return new Album({
      id: albumData.id,
      name: albumData.name,
      genre: albumData.genre,
      releaseDate: albumData.releaseDate,
      songs: songs,
    });
  });

  return new Artist({
    id: artistData.id,
    name: artistData.name,
    surname: artistData.surname,
    albums: albums,
  });
});

const artistStore = new ArtistStore({
  artists: artists,
});

ReactDOM.render(
  <React.StrictMode>
    <App store={artistStore} />
  </React.StrictMode>,
  document.getElementById('root')
);
