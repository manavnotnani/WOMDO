const fs = require('fs')
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const { Deepgram } = require('@deepgram/sdk')
const ffmpeg = require('ffmpeg-static')

let getSubtitles = require('youtube-captions-scraper').getSubtitles;

getSubtitles({
  videoID: 'KqrJCRLz80k', // youtube video id
  lang: 'en' // default: `en`
}).then(captions => {
  let textOutput = captions.map(subtitle => subtitle.text).join('\n');
  fs.writeFile('subtitles.txt', textOutput, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

// const deepgram = new Deepgram('02129826d5acb6c913b8fff32c2126d0a803d076')
// const YD = new YoutubeMp3Downloader({
//   ffmpegPath: ffmpeg,
//   outputPath: './',
//   youtubeVideoQuality: 'highestaudio'
// })

// YD.download('bzbsJGMVHxQ')

// YD.on('progress', data => {
//   console.log(data.progress.percentage + '% downloaded')
// })

// YD.on('finished', async (err, video) => {
//   const videoFileName = video.file
//   console.log(`Downloaded ${videoFileName}`)

//   const file = {
//     buffer: fs.readFileSync(videoFileName),
//     mimetype: 'audio/mp3'
//   }
//   const options = {
//     punctuate: true
//   }

//   const result = await deepgram.transcription.preRecorded(file, options).catch(e => console.log(e))
//   const transcript = result.results.channels[0].alternatives[0].transcript

//   fs.writeFileSync(`${videoFileName}.txt`, transcript, () => `Wrote ${videoFileName}.txt`)
//   fs.unlinkSync(videoFileName)
// })
