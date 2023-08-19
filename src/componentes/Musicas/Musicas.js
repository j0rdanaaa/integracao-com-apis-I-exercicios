import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";
const musicasLocal = [
  {
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3",
  },
  {
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3",
  },
  {
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3",
  },
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getPlaylistTracks(props.playlist.id);
  }, [props.playlist.id]);

  const getPlaylistTracks = (playListId) => {
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };

    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playListId}/tracks`,
        headers
      )
      .then((resp) => {
        setMusicas(resp.data.result.tracks);
        console.log("sucesso músicas", resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addTrackToPlaylist = (playListId) => {
    const body = {
      name,
      artist,
      url,
    };
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playListId}/tracks`,
        body,
        headers
      )
      .then(() => {
        setName("");
        setArtist("");
        setUrl("");
        console.log("adicionou musicas");
        getPlaylistTracks(props.playlist.id);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  const removeTrackFromPlaylist = (trackId) => {
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${trackId}`,
        headers
      )
      .then((response) => {
        getPlaylistTracks(props.playListId.id);
        console.log("removeu músicas", response.data);
      })
      .catch((error) => {
        console.log(error.respose);
      });
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => removeTrackFromPlaylist(musica.id)}>
              X
            </button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <InputMusica
          onChange={(e) => setName(e.target.value)}
          placeholder="musica"
          value={name}
        />
        <InputMusica
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="url"
        />
        <Botao onClick={() => addTrackToPlaylist(props.playlist.id)}>
          Adicionar musica
        </Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
