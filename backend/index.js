// const fs = require('fs')
// const YoutubeMp3Downloader = require('youtube-mp3-downloader')
// const { Deepgram } = require('@deepgram/sdk')
// const ffmpeg = require('ffmpeg-static')

import fs from "fs";
import YoutubeMp3Downloader from "youtube-mp3-downloader";
import { Deepgram } from "@deepgram/sdk";
import ffmpeg from "ffmpeg-static";
// let getSubtitles = require('youtube-captions-scraper').getSubtitles;
import { getSubtitles } from "youtube-captions-scraper";

getSubtitles({
  videoID: 'r8dSD5qNUe8', // youtube video id
  lang: 'hi' // default: `en`
}).then(captions => {
  let textOutput = captions.map(subtitle => subtitle.text).join('\n');
  fs.writeFile('subtitles.txt', textOutput, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

// getSubtitles("TwXgOMDONK8", "en")