const SnoCord = require('SnoCord');
const config = require("./config.json");
const ytdl = require('ytdl-core');
const googleTTS = require('google-tts-api');
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

let announceChannel;

const introAnnouncements = ["Robot Radio. Moving on to", "Robot Radio. Now playing", "Up next,", "You are listening to Robot Radio.", "Playing next", "Robot Radio. Up next,", "Moving on to"];

addmusic("Tame Impala - New Person, Same Old Mistakes", "https://www.youtube.com/watch?v=tEXYfT_G0W0");
addmusic("Run The Jewels - a few words for the firing squad", "https://www.youtube.com/watch?v=5dgH1mlXDhA");
addmusic("Childish Gambino - 3005","https://www.youtube.com/watch?v=tG35R8F2j8k");
addmusic("Caravan Palace - Plume", "https://www.youtube.com/watch?v=cq3fwlZdWhw")
addmusic("Logic - Delorean", "https://www.youtube.com/watch?v=dtq-s0XrUbg")
addmusic("Logic - O C D", "https://www.youtube.com/watch?v=AD8TlP0Qg4o")
addmusic("Run The Jewels - Blockbuster Night Part 1", "https://www.youtube.com/watch?v=uuWQyfGa1yI")
addmusic("Run The Jewels - Call Ticketron", "https://www.youtube.com/watch?v=eaJmgMuYNjc")
addmusic("Joyner Lucas - Revenge", "https://www.youtube.com/watch?v=ZL-AuG4kfOs")
addmusic("Dan Croll - From Nowhere", "https://www.youtube.com/watch?v=973ibay5504")
addmusic("Aviators - Godhunter", "https://www.youtube.com/watch?v=GoC8OBjs7Iw")
addmusic("Aviators - Paralyzed", "https://www.youtube.com/watch?v=-6fcs8uE5Q4")
addmusic("Aviators - All Hallows", "https://www.youtube.com/watch?v=eI5r19NT6_0")
addmusic("Tame Impala - Posthumous Forgiveness", "https://www.youtube.com/watch?v=44lWO3qhQMk")
addmusic("Tame Impala - Borderline", "https://www.youtube.com/watch?v=2g5xkLqIElU")
addmusic("J Cole - Photograph", "https://www.youtube.com/watch?v=tIRi44nVNCA")
addmusic("J Cole - 19 85", "https://www.youtube.com/watch?v=ii6u1wSAu90")

async function* nextStreamGenerator(){
        let nextUp;
        let nextText;
   while(true){
        nextUp = randomArr(musics);
        nextText = randomArr(introAnnouncements);
        /*
        let stream =  streamArray([nextText + " " + nextUp.name])
        .pipe(makeProp("message"))
        .pipe(speechStream({
            amplitude: 100,
            pitch: 60,
            speed: 160,
            wordgap: 0.8
        }))
       */
        let speechLink = await googleTTS(nextText + " " + nextUp.name, 'en', 1)
        announceChannel.send(nextText + "\n" + nextUp.link)

        //yield "https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20World&tl=en&total=1&idx=0&textlen=11&tk=88715.498498&client=t&prev=input&ttsspeed=1";
        //yield stream;
        //console.log(await googleTTS(nextText + " " + nextUp.name, 'en', 1));
        yield speechLink;
        const uhh = ytdl(nextUp.link, { filter: 'audioonly' });
        console.log("song now")
        yield uhh;
    }
}

let nextStream = nextStreamGenerator();

function randomArr(array) {
    return array[Math.floor(Math.random() * array.length)];
 }

 function recursivelyPlay(connection){
    nextStream.next()
    .then(obj=>{
        const dispatcher = connection.play(obj.value);
        dispatcher.on('speaking', speaking=> {
        if(!speaking){
            console.log('moving on')
            recursivelyPlay(connection);
        }
        
    })
    })
    
 }

 


bot.client.on('ready', async () => {

    const sandstorm = await ytdl('https://www.youtube.com/watch?v=y6120QOlsfU', { filter: 'audioonly' });

      // Only try to join the sender's voice channel if they are in one themselves

        bot.client.channels.fetch('255003142595411969')
        .then(async ch => {
           const connection = await ch.join();
           /*
           let stream =  streamArray(["Robot Radio. Moving on to Darude - Sandstorm"])
            .pipe(makeProp("message"))
            .pipe(speechStream({
                amplitude: 100,
                pitch: 60,
                speed: 160,
                wordgap: 0.8
            }))
            */
            //.pipe(connection.play())

            /*
            const dispatcher = connection.play(nextStream().next().value);
            dispatcher.on('speaking', speaking=> {
                if(!speaking){
                    console.log('endd')
                    connection.play(nextStream().next().value);
                }
                
            })
            */
           bot.client.channels.fetch('730231922327814154').then(ach=>{
               announceChannel = ach;
               recursivelyPlay(connection);
           })
           
            //connection.play(speechStream())
            // connection.play(ytdl('https://www.youtube.com/watch?v=y6120QOlsfU', { filter: 'audioonly' }));

        });
     
    
  });








bot.init();