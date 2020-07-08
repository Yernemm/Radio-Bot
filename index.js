const SnoCord = require('SnoCord');
const config = require("./config.json");
const ytdl = require('ytdl-core');
var speechStream = require("speech-stream");
var streamArray = require("stream-array");
var makeProp = require("make-prop-stream");

let bot = new SnoCord.Bot();
bot.setConfig(config);

bot.client.on('ready', () => {
    bot.client.user.setPresence({ status: 'online', game: { name: 'the radio.' } });

});
bot.addCoreCommands();
bot.addCommandHandler('./commands/');

stream = new require('stream').Transform()
stream._transform = function (chunk,encoding,done) 
{
    this.push(chunk)
    done()
}

const musics = [

];

function addmusic(name, link){
    musics.push({
        name: name,
        link: link
    });
}

const introAnnouncements = ["Robot Radio. Moving on to", "Robot Radio. Now playing", "Up next,", "You are listening to Robot Radio."];

addmusic("Tame Impala - New Person, Same Old Mistakes", "https://www.youtube.com/watch?v=tEXYfT_G0W0");
addmusic("Run The Jewels - a few words for the firing squad", "https://www.youtube.com/watch?v=5dgH1mlXDhA");
addmusic("Childish Gambino - 3005","https://www.youtube.com/watch?v=tG35R8F2j8k");

function * nextStream(){
    while(true){
        let nextUp = randomArr(musics);

        let stream =  streamArray([randomArr(introAnnouncements) + " " + nextUp.name])
        .pipe(makeProp("message"))
        .pipe(speechStream({
            amplitude: 100,
            pitch: 60,
            speed: 160,
            wordgap: 0.8
        }))

        yield stream;

        yield ytdl(nextUp.link, { filter: 'audioonly' });
    }
}

function randomArr(array) {
    return array[Math.floor(Math.random() * array.length)];
 }


bot.client.on('ready', async () => {

    const sandstorm = await ytdl('https://www.youtube.com/watch?v=y6120QOlsfU', { filter: 'audioonly' });

      // Only try to join the sender's voice channel if they are in one themselves

        bot.client.channels.fetch('255003142595411969')
        .then(async ch => {
            const connection = await ch.join();
           let stream =  streamArray(["Robot Radio. Moving on to Darude - Sandstorm"])
            .pipe(makeProp("message"))
            .pipe(speechStream({
                amplitude: 100,
                pitch: 60,
                speed: 160,
                wordgap: 0.8
            }))
            //.pipe(connection.play())
            const dispatcher = connection.play(stream);
            dispatcher.on('speaking', speaking=> {
                if(!speaking){
                    console.log('endd')
                    connection.play(sandstorm);
                }
                
            })
            //connection.play(speechStream())
            // connection.play(ytdl('https://www.youtube.com/watch?v=y6120QOlsfU', { filter: 'audioonly' }));

        });
     
    
  });








bot.init();