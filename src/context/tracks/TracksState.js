import React, { useReducer } from 'react';
import axios from 'axios';
import TracksContext from './tracksContext';
import TracksReducer from './tracksReducer';
import {
  GET_TOP_TEN,
  SET_LOADING,
  GET_TRACK,
  GET_VIDEO,
  SEARCH_TRACKS,
  SET_SEARCH,
} from '../types';

let musicApiKey;
let youtubeApiKey;
let lastFm;

if (process.env.NODE_ENV !== 'production') {
  musicApiKey = process.env.REACT_APP_MM_KEY;
  youtubeApiKey = process.env.REACT_APP_YOU_API;
  lastFm = process.env.REACT_APP_LASTFM_KEY;
} else {
  musicApiKey = process.env.REACT_APP_MM_KEY;
  youtubeApiKey = process.env.REACT_APP_YOU_API;
  lastFm = process.env.REACT_APP_LASTFM_KEY;
}

const TracksState = (props) => {
  const initialState = {
    track_list: [],
    search: '',
    loading: false,
    track: {},
    video: {},
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);

  // Get topten music from MM
  const getTopTen = async () => {
    setLoading();

    let data = [];

    // Data retrieve from musixmatch
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=10&country=ar&f_has_lyrics=1&apikey=${musicApiKey}`
    );

    // Generate promises then execute in order
    const promises = await res.data.message.body.track_list.map(
      async (item) => {
        const artistSingular = item.track.artist_name.split(' feat');
        let res;

        if (artistSingular.length > 1) {
          res = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFm}&artist=${artistSingular[0]}&album=${item.track.album_name}&format=json`
          );
        } else {
          res = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFm}&artist=${item.track.artist_name}&album=${item.track.album_name}&format=json`
          );
        }

        return res.data.album;
      }
    );

    // Resolve all promises
    const res1 = await Promise.all(promises);

    // Iterate over res and add image from res1
    res.data.message.body.track_list.forEach((item, index) => {
      data.push({
        image: res1[index] !== undefined ? res1[index].image[2]['#text'] : '',
        position: index + 1,
        track: item.track,
      });
    });

    dispatch({
      type: GET_TOP_TEN,
      payload: data,
    });
  };

  // Get track info and lyrics
  const getTrack = async (id, artist, track) => {
    setLoading();

    // API for track info
    const resM = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${id}&apikey=${musicApiKey}`
    );

    const artistSingular = artist.split('feat');
    let res = {};
    // API for lyrics
    if (artistSingular.length > 1) {
      res = await axios.get(
        `https://api.vagalume.com.br/search.php?apikey=1&art=${artistSingular[0]}&mus=${track}&extra=alb`
      );
    } else {
      res = await axios.get(
        `https://api.vagalume.com.br/search.php?apikey=1&art=${artist}&mus=${track}&extra=alb`
      );
    }

    // Prepare data to send in dispatch
    const preData = resM.data.message.body.track;
    preData.lyrics =
      res.data.type === 'exact' || res.data.type === 'aprox'
        ? res.data.mus[0].text
        : null;
    const genre =
      resM.data.message.body.track.primary_genres.music_genre_list.length > 0
        ? {
            music_genre:
              resM.data.message.body.track.primary_genres.music_genre_list[0]
                .music_genre.music_genre_name,
          }
        : { music_genre: null };
    const data = {
      ...preData,
      ...genre,
    };
    dispatch({
      type: GET_TRACK,
      payload: data,
    });
  };

  // Get video from YT
  const getVideo = async (track, artist) => {
    let res = {};
    const artistFormated =
      artist !== undefined ? artist.replace(/\s/g, '+') : artist;
    const trackFormated =
      track !== undefined ? track.replace(/\s/g, '+') : track;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${artistFormated}%2B${trackFormated}&topicId=music%2Bvideo&type=video&videoCaption=any&key=${youtubeApiKey}`;

    try {
      res = await axios(url);
    } catch (error) {
      res.video = null;
      // console.clear();
    }
    const data = res.video !== null ? res.data.items[0] : res.video;
    dispatch({
      type: GET_VIDEO,
      payload: data,
    });
  };

  // Get artist data
  const getInfo = async (artist) => {
    const res = await axios(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${
        artist !== undefined ? artist.split('feat')[0] : artist
      }`
    );

    const data = res.data.artists !== null ? res.data.artists[0] : null;
    return data;
  };

  // Search Lyrics by name
  const findTracks = async (song) => {
    setLoading();

    let data = [];

    // Data retrieve from musixmatch
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${song}&page_size=10&page=1&s_track_rating=desc&apikey=${musicApiKey}`
    );

    // Generate promises then execute in order
    const promises = await res.data.message.body.track_list.map(
      async (item) => {
        const artistSingular = item.track.artist_name.split(' feat');
        let res;

        if (artistSingular.length > 1) {
          res = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFm}&artist=${artistSingular[0]}&album=${item.track.album_name}&format=json`
          );
        } else {
          res = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFm}&artist=${item.track.artist_name}&album=${item.track.album_name}&format=json`
          );
        }

        return res.data.album;
      }
    );

    // Resolve all promises
    const res1 = await Promise.all(promises);

    // Iterate over res and add image from res1
    res.data.message.body.track_list.forEach((item, index) => {
      data.push({
        image: res1[index] !== undefined ? res1[index].image[2]['#text'] : '',
        position: null,
        track: item.track,
      });
    });

    dispatch({
      type: SET_SEARCH,
      payload: song,
    });
    dispatch({
      type: SEARCH_TRACKS,
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <TracksContext.Provider
      value={{
        track_list: state.track_list,
        search: state.search,
        loading: state.loading,
        track: state.track,
        video: state.video,
        getTopTen,
        getTrack,
        getVideo,
        getInfo,
        findTracks,
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
