const SnoCord = require('snocord');
const config = require("./config.json");
const ytdl = require('ytdl-core');
const googleTTS = require('google-tts-api');

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

const introAnnouncements = [
    "Robot Radio. Moving on to", 
    "Robot Radio. Now playing,", 
    "Up next,",
    "You are listening to Robot Radio.", 
    "Playing next,", 
    "Robot Radio. Up next,", 
    "Moving on to",
    "This is Robot Radio. Playing,", 
    "The Radio on Discord. Up next,", 
    "Variety Channel. Robot Radio.", 
    "The one Discord Radio. Moving on to",,
    "The one Discord Radio. Now playing,",
    "This is your host, Null Body. Playing",
    "The bones do work, and they play",
    "Wub wub wub robot radioo.",
    "What up fam, let's listen to",
    "Next song, picked by yours truly, Null Body.",
    "Hey hey hey hey. It's time for",
    "It is -CURRENT TIME-, that's right:",
    "Hey, you hearin this? That's right, it's",
    "The only music I want to hear now is",
    "Oh this one's my favourite:",
    "Love this next track:",
    "You have got to hear this next one:",
    "More music, just ahead."
];

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
addmusic("Cannonhead - This Place Is Built", "https://www.youtube.com/watch?v=FwzvIZFjm7g")
addmusic("Caravan Palace - Melancolia", "https://www.youtube.com/watch?v=qI7RI3Om_dY")
addmusic("Smash Mouth - All Star", "https://www.youtube.com/watch?v=5ZYgIrqELFw")
addmusic("Caravan Palace - Wonderland", "https://www.youtube.com/watch?v=vCXsRoyFRQE")
addmusic("Aviators - Requiem for the King", "https://www.youtube.com/watch?v=ymWI4magKio")
addmusic("Aviators - Traveler's Song", "https://www.youtube.com/watch?v=EZno7ZAR-fM")
addmusic("Childish Gambino - Feels Like Summer", "https://www.youtube.com/watch?v=F1B9Fk_SgI0")
addmusic("Gorillaz - Feel Good Inc.", "https://www.youtube.com/watch?v=dKez38i5h14")
addmusic("Sabaton - Primo Victoria", "https://www.youtube.com/watch?v=5DrkjRJLzKg")
addmusic("Metallica - One", "https://www.youtube.com/watch?v=aSNJ00iAZ7I")
addmusic("System Of A Down - B Y O B", "https://www.youtube.com/watch?v=zUzd9KyIDrM")
addmusic("System Of A Down - Chop Suey!", "https://www.youtube.com/watch?v=CSvFpBOe8eY")

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
        announceChannel.send(nextText + " " + nextUp.name + "\n" + nextUp.link)

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