import React from "react";
import { observer } from "mobx-react-lite";
import { DataGrid, Column, Editing, Popup, Form } from "devextreme-react/data-grid";
import { Artist } from "./Models/Artist";
import { Album } from "./Models/Album";
import { Song } from "./Models/Song";
import { ArtistStore } from "./Stores/ArtistStore";

interface AppProps {
  store: ArtistStore;
}

const App: React.FC<AppProps> = observer(({ store }) => {
  const handleRowInserting = (e: any) => {
    const { name, surname, albums } = e.data;
    const newAlbums = albums.map((album: any) => {
      const songs = album.songs.map((song: any) => new Song({ id: song.id, name: song.name, duration: song.duration }));
      return new Album({ id: album.id, name: album.name, genre: album.genre, releaseDate: album.releaseDate, songs: songs });
    });
    store.addArtist(name, surname, newAlbums);
    e.cancel = false;
  };

  const handleRowRemoving = (e: any) => {
    const artist = e.data as Artist;
    store.removeArtist(artist);
  };

  return (
    <div>
      <h1>Artists Management</h1>
      <DataGrid
        dataSource={store.artists}
        keyExpr="id"
        showBorders={true}
        onRowInserting={handleRowInserting}
        onRowRemoving={handleRowRemoving}
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup title="Artist Info" showTitle={true} width={700} height={525} />
          <Form>
            <Column dataField="name" />
            <Column dataField="surname" />
            <Column dataField="albums" />
          </Form>
        </Editing>
        <Column dataField="name" caption="Name" />
        <Column dataField="surname" caption="Surname" />
        <Column
          dataField="albums"
          caption="Albums"
          cellRender={({ value }) => (
            <div>
              {value.map((album: Album) => (
                <div key={album.id}>
                  <strong>{album.name}</strong> - {album.genre}
                  <div>
                    {album.songs.map((song: Song) => (
                      <div key={song.id}>{song.name} - {song.duration}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </DataGrid>
    </div>
  );
});

export default App;
