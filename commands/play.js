const ytdl = require('ytdl-core');


class ExampleCommand
{
    constructor()
    {
        this.metadata = {
            commandWord: 'play',
            aliases: [],
            description: 'Adds num1 and num2 and pings you in return that many times. Requires ban permission for no reason!',
            usage: 'num1 num2',
            permissions: [],
            ownerOnly: false
        };
    }

    async run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

        let message = sno.message;


        if (message.member.voice.channel) {

            const connection = await message.member.voice.channel.join();

            connection.play(ytdl('https://www.youtube.com/watch?v=y6120QOlsfU', { filter: 'audioonly' }));
          } else {
            message.reply('You need to join a voice channel first!');
          }


    }
}
module.exports = ExampleCommand;