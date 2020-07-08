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