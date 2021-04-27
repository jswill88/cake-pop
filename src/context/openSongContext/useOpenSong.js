import { createContext, useContext } from 'react';
import useFetch from '../../hooks/ajax'
import message from 'antd/es/message'
import { useCookies } from 'react-cookie';
import { useSongList }  from '../songListContext/'
import { useSongSettings } from '../songSettingsContext';


const OpenSongContext = createContext();

function useOpenSong() {
  const { openSongId, setOpenSongId, title, setTitle } = useContext(OpenSongContext);
  const fetchApi = useFetch();
  const [cookies] = useCookies(['token'])
  const { songs, setSongs } = useSongList();
  const {
    setProg,
    handleTempoChange,
    setLoopLength,
    buttons,
    setButtons,
    prog,
    loopLength
  } = useSongSettings();

  const deleteSong = async () => {
    const result = await fetchApi('/deletesong', 'delete', {
      songIdToDelete: openSongId,
      token: cookies.token
    })
    if (!result.error) {
      // reset();
      setSongs(arr => arr.filter(({ id }) => id !== openSongId))
      setOpenSongId(false);
      setTitle('New Song');
      handleTempoChange(120);
      setProg(['I', 'I', 'I', 'I']);
      message.success(`${result.data.title} successfullly deleted`)
      return 'success';
    } else {
      message.error(result.message)
      return 'error'
    }
  }

    const rename = async newTitle => {
    console.log('renaming')
    if (songs.length) {
      let songInList = songs.filter(({ title: titleInList }) => titleInList === title)
      if (songInList.length) {
        const { id: songId } = songInList[0];
        const result = await fetchApi('/rename', 'patch', { newTitle, songId, token: cookies.token });
        if (result.error) {
          message.error(result.message)
          return 'error';
        } else {
          const newSongs = songs.map(song => {
            if (song.id === songId) return { title: result.data.newTitle, id: song.id }
            else return song;
          });
          newTitle = result.data.newTitle;
          setSongs([...newSongs])
        }
      }
    } 
    setTitle(newTitle)
  }

  const open = async (songId) => {
    // stopAudio()
    const result = await fetchApi('/open', 'post', { token: cookies.token, songId })
    if (!result.error) {

      const { data: songObj } = result;
      setProg(songObj.chordProgression);
      // handleTempoChange(songObj.bpm)
      setLoopLength(songObj.numberOfBeats);
      setTitle(songObj.title)
      setOpenSongId(songObj._id)
      setButtons({ ...songObj.buttonsPressed })
      return 'success'
    } else {
      message.error(result.message)
      return 'error';
    }
  }

  const newSong = async () => {
    // reset();
    setOpenSongId(false);
    // handleTempoChange(120);
    setProg(['I', 'I', 'I', 'I']);
    const titles = songs.map(({ title }) => title)
    let newTitle = 'New Song'
    let i = 1;
    while (titles.includes(newTitle)) {
      newTitle = `New Song ${i}`;
      i++;
    }
    setTitle(newTitle);
    return 'success';

  }

    /**
   * @param {String} type Should be 'new' or 'update'
   */
     const saveSong = async (type, newTitle) => {

      const songObj = {
        title: newTitle || title,
        buttonsPressed: buttons,
        // bpm: tempo,
        numberOfBeats: loopLength,
        chordProgression: prog,
        token: cookies.token
      }
      if (type === 'update') {
        songObj.songId = openSongId;
      }
      const result = await fetchApi(
        type === 'update' ? '/update' : '/save',
        type === 'update' ? 'put' : 'post',
        songObj)
  
      if (!result.error) {
        if (type === 'new') {
          setSongs(arr => [...arr, result.data])
          setOpenSongId(result.data.id)
          setTitle(result.data.title)
        }
        message.success(`${result.data.title} successfully saved`)
        return 'success'
      } else {
        message.error(result.message)
        return 'error';
      }
    }

  return {
    deleteSong,
    title,
    setTitle,
    openSongId,
    setOpenSongId,
    rename,
    open,
    newSong,
    saveSong
  };
}

export { OpenSongContext };
export { useOpenSong };