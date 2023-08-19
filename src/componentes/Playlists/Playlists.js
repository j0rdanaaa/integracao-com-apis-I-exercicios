import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";
import { BASE_URL } from "../../constants/BASE_URL";

const playlistsLocal = [
  {
    id: 1,
    name: "Playlist 1",
  },
  {
    id: 2,
    name: "Playlist 2",
  },
  {
    id: 3,
    name: "Playlist 3",
  },
  {
    id: 4,
    name: "Playlist 4",
  },
];
function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [pesquisa, setPesquisa] = useState("")

 useEffect(() => {
  getAllPlaylists();
 }, []);

  const getAllPlaylists = () => {
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        headers
      )
      .then((response) => {
        setPlaylists(response.data.result.list);
        console.log("sucesso de id", response.data);
      })
      .catch((error) => {
        console.log("erro de id", error.response.data);
      });
  };

  const searchPlaylist = async (pesquisa) => {
    const headers = {
       Authorization : AUTH_TOKEN
    }
  }
  
  try {
    const resp = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`, headers)
    if (resp.data.result.playlist.length){
    setPlaylists(resp.data.result.playlist)
    setPesquisa("")
  } else {
    alert('Playlist não encontrada')

  }
    
  } catch (error) {
    console.log(error)
  }
  
  const deletePlaylist = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: AUTH_TOKEN
        }

      })
      getAllPlaylists()
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
      <input type="text" placeholder="Nome da playlist"
      onChange={(e) => setPesquisa(e.target.value)}
      value={pesquisa}/>
      <button onClick={() => searchPlaylist(pesquisa)}>Buscar</button>
      
      </div>
      {playlists.map((playlist) => {
        return <Musicas key={playlist.id} playlist={playlist} />;
        <button onClick={()=>{deletePlaylist(playlist.id)}}>Delete</button>
      })}
    </div>
  );
}

export default Playlists;
