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
  SET_TOP_TEN,
} from '../types';

let youtubeApiKey;
let deezerUrl = '';

if (process.env.NODE_ENV !== 'production') {
  youtubeApiKey = process.env.REACT_APP_YOU_API;
} else {
  deezerUrl = 'https://api.deezer.com';
  youtubeApiKey = process.env.REACT_APP_YOU_API;
}

const TracksState = props => {
  const initialState = {
    track_list: [],
    search: '',
    top: 'Arg',
    loading: false,
    track: {},
    video: {},
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);

  // Set top 10 - ARG or GLO
  const setTopTen = top => {
    dispatch({
      payload: top,
      type: SET_TOP_TEN,
    });
  };

  // Get topten music from MM
  const getTopTen = async top => {
    setLoading();

    let data = [];

    if (top === 'Arg') {
      const resDeezerArg = await axios.get(`${deezerUrl}/playlist/1279119721`);
      resDeezerArg.data.tracks.data.slice(0, 10).forEach((item, index) => {
        data.push({
          ...item,
          position: index + 1,
        });
      });
    } else {
      const resDeezer = await axios.get(`${deezerUrl}/chart/0/tracks`);
      data = resDeezer.data.data;
    }

    dispatch({
      type: GET_TOP_TEN,
      payload: data,
    });
  };

  // Get track info and lyrics
  const getTrack = async (id, artist, track) => {
    setLoading();

    const resDeezer = await axios.get(`${deezerUrl}/track/${id}`);

    const topTenArtist = await axios.get(
      `${deezerUrl}/artist/${resDeezer.data.artist.id}/top&index=0&limit=10&output=json`
    );

    // Get lyrics from Vagalume
    let vagalumeLyrics;
    try {
      const res = await axios.get(
        `https://api.vagalume.com.br/search.php?apikey=1&art=${artist}&mus=${track}`
      );
      vagalumeLyrics =
        res.data.type === 'exact' || res.data.type === 'aprox'
          ? res.data.mus[0].text
          : null;
    } catch (error) {
      vagalumeLyrics = null;
    }
    let ovhLyric;

    let lyrics;
    // API for lyrics
    if (vagalumeLyrics !== null) {
      lyrics = vagalumeLyrics;
    } else {
      // Get lyrics from Ovh
      try {
        const res = await axios.get(
          `https://api.lyrics.ovh/v1/${artist}/${track}`
        );
        ovhLyric = res.data.lyrics.replace(/\n\n/g, '\n');
      } catch (error) {
        console.log(error.message);
        ovhLyric = null;
      }
      lyrics = ovhLyric;
    }
    // Prepare data to send in dispatch
    const preData = resDeezer.data;

    const data = {
      artist_name: preData.artist.name,
      track_title: preData.title,
      album_name: preData.album.title,
      lyrics: lyrics,
      explicit_content_lyrics: preData.explicit_content_lyrics,
      release_date: preData.release_date,
      topTen: topTenArtist.data.data,
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
  const getInfo = async artist => {
    const res = await axios(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${
        artist !== undefined ? artist.split('feat')[0] : artist
      }`
    );

    const data = res.data.artists !== null ? res.data.artists[0] : null;
    return data;
  };

  // Search Lyrics by song or artist
  const findTracks = async song => {
    setLoading();

    let res;
    let data;
    // If refresh top 10 or search
    if (song === '') {
      // Refresh top 10 deezer
      res = await axios.get(`${deezerUrl}/chart/0/tracks`);
      data = res.data.data;
    } else {
      // Search lyrics deezer
      res = await axios.get(
        `${deezerUrl}/search/track/?q=${song}&index=0&limit=100&output=json`
      );
      data = res.data.data;
    }

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
        top: state.top,
        loading: state.loading,
        track: state.track,
        video: state.video,
        getTopTen,
        getTrack,
        getVideo,
        getInfo,
        findTracks,
        setTopTen,
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
