// const fs = require('fs')
// const YoutubeMp3Downloader = require('youtube-mp3-downloader')
// const { Deepgram } = require('@deepgram/sdk')
// const ffmpeg = require('ffmpeg-static')

import fs from "fs";
// let getSubtitles = require('youtube-captions-scraper').getSubtitles;
import { getSubtitles } from "youtube-captions-scraper";

async function saveSubtitles(videoId, lang = 'en') {
    try {
      const captions = await getSubtitles({ videoID: videoId, lang: lang });
      const textOutput = captions.map(subtitle => subtitle.text).join('\n');
      fs.writeFile('subtitles.txt', textOutput, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    } catch (error) {
      console.error('Error fetching or saving subtitles:', error);
    }
  }

saveSubtitles("TwXgOMDONK8", "en")