/* Copyright (c) 2018 by Michael Galstyan <mike505222@gmail.com>
 * All rights reserved.
 *
 * License: 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * I give SiaPrime permission to use this code as long as they dont distribute it.
 */


const Discord = require("discord.js"); //Loads the discord library

const client = new Discord.Client(); //The name to refer to the bot in code

const config = require("./config.json"); //Requires the config file

const FAQid = "501433660658941954"

client.commands = new Discord.Collection();

client.on("ready", () => {
  console.log(`Its prime time`); 
  client.user.setActivity(`make Sia great again`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

});

client.on('error', console.error);

client.on('message', async message => {
  if(message.author.bot) return;  
  if(!message.guild) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

    if(command === "help") {
      if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
        message.delete(1);
      }
      else {
        message.author.send("Here are the list of commands so far integrated into the bot:\n/defrag @user(Optional, You can also run the command **without** tagging a user.)\n/aidrop @user(Optional)\n/mining @user(Optional)\n/hosting @user(Optional)\n/renting @user(Optional)\n\nIf the bot runs into any issues/bugs or crashes/turns off, please message @Gaming Radar101#3404 with the issue as well as what time it happened.")
        .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
        message.delete(1);
      }
    }

    if (message.channel.id === FAQid) { //FAQ Commands go in here
        
      /*

      TEMPLATE

      --Single keyword--

      test1 = 'keyword';
      if (message.content.includes(test1)) {
        message.reply("Blah blah blah")
      }

      --If it includes one of these keywords--

      test2 = 'keyword';
      test3 = 'keyword';
      if (message.content.includes(test2) || message.content.includes(test3)) {
        message.reply("Blah blah blah")
      }

      --Must include both keywords--

      test4 = 'keyword';
      test5 = 'keyword';
      if (message.content.includes(test4) && message.content.includes(test5)) {
        message.reply("Blah blah blah")
      }

      */


      forkBlock = '7269';
      if (message.content.includes(forkBlock)) {
        message.reply("It appears you are stuck on the fork block from 12/19/2018. To resolve, delete consensus.db from the Siaprime-UI folder and resync the blockchain.")
      }

    }

      if(command === "defrag") {
        let member = message.mentions.members.first();
        if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
          message.delete(1);
        }
        else {
          if (member) {
            message.delete(1);
            message.channel.send(`<@${member.user.id}>, It appears you may have an issue with wallet defragmentation. Behind the scenes the SiaPrime wallet is composed of multiple addresses. Sometimes the wallet will need to move balances within these addresses, which takes a transaction on the network. The 0.088 SCP transaction is the network fee for this transaction.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> tagged <@${member.user.id}> with the Defrag command in ${message.channel}`);
          } else {
            message.delete(1);
            message.channel.send(`It appears you may have an issue with wallet defragmentation. Behind the scenes the SiaPrime wallet is composed of multiple addresses. Sometimes the wallet will need to move balances within these addresses, which takes a transaction on the network. The 0.088 SCP transaction is the network fee for this transaction.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> used the Defrag command in ${message.channel}`);
          }
        }
      }

      if(command === "airdrop") {
        let member = message.mentions.members.first();
        if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
          message.delete(1);
        }
        else {
          if (member) {
            message.delete(1);
            message.channel.send(`Hello <@${member.user.id}>, if you had a SiaCoin (SC) balance as of block 179,000 you’re eligible for the SiaCoin:SiaPrime 5:1 aidrop! Download the SiaPrime-UI wallet here <https://siaprime.net/#download> and simply “Load a wallet from a seed” using your SiaCoin seed for both the seed and the password.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> tagged <@${member.user.id}> with the Airdrop command in ${message.channel}`);
          } else {
            message.delete(1);
            message.channel.send(`Hello, if you had a SiaCoin (SC) balance as of block 179,000 you’re eligible for the SiaCoin:SiaPrime 5:1 aidrop! Download the SiaPrime-UI wallet here <https://siaprime.net/#download> and simply “Load a wallet from a seed” using your SiaCoin seed for both the seed and the password.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> used the Airdrop command in ${message.channel}`);
          }
        }
      }

      if(command === "mining") {
        let member = message.mentions.members.first();
        if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
          message.delete(1);
        }
        else {
          if (member) {
            message.delete(1);
            message.channel.send(`Welcome <@${member.user.id}>! To get started with any blake-2b compatible miner, download the SiaPrime wallet from <https://siaprime.net/#download> and choose one (or more) of the excellent SiaPrime pools: \n<http://siaprimestats.com/site/mining>\n<https://intrepidpool.com/site/mining>\n<http://fluxpool.tech/site/mining>\n<https://hyperpool.tech/site/mining>\n<https://prime.siamining.com/help>`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> tagged <@${member.user.id}> with the Mining command in ${message.channel}`);
          } else {
            message.delete(1);
            message.channel.send(`Welcome! To get started with any blake-2b compatible miner, download the SiaPrime wallet from <https://siaprime.net/#download> and choose one (or more) of the excellent SiaPrime pools: \n<http://siaprimestats.com/site/mining>\n<https://intrepidpool.com/site/mining>\n<http://fluxpool.tech/site/mining>\n<https://hyperpool.tech/site/mining>\n<https://prime.siamining.com/help>`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> used the Mining command in ${message.channel}`);
          }
        }
      }

      if(command === "hosting") {
        let member = message.mentions.members.first();
        if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
          message.delete(1);
        }
        else {
          if (member) {
            message.delete(1);
            message.channel.send(`Interested in hosting <@${member.user.id}>? Hosts provide the backbone to our network, and currently qualify for bonus hosting incentives courtesy of the SiaPrime team. Contact Starbuckz8#2126 or FaustianAGI#2657 to get started. For a general overview of hosting, <https://siasetup.info/guides/hosting_on_sia>`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> tagged <@${member.user.id}> with the Hosting command in ${message.channel}`);
          } else {
            message.delete(1);
            message.channel.send(`Interested in hosting? Hosts provide the backbone to our network, and currently qualify for bonus hosting incentives courtesy of the SiaPrime team. Contact Starbuckz8#2126 or FaustianAGI#2657 to get started. For a general overview of hosting, <https://siasetup.info/guides/hosting_on_sia>`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> used the Hosting command in ${message.channel}`);
          }
        }
      }

      if(command === "renting") {
        let member = message.mentions.members.first();
        if(!message.member.roles.some(r=>["Guides", "Founders", "Moderators"].includes(r.name)) ) {
          message.delete(1);
        }
        else {
          if (member) {
            message.delete(1);
            message.channel.send(`Interested in renting space with the SiaPrime network <@${member.user.id}>? Great! There is a general guide here (though written for Sia, it should be very similar) <https://siasetup.info/guides/renting_on_sia>. Please contact any Guides or Founders with questions, and to see if renting is right for your needs.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> tagged <@${member.user.id}> with the Renting command in ${message.channel}`);
          } else {
            message.delete(1);
            message.channel.send(`Interested in renting space with the SiaPrime network? Great! There is a general guide here (though written for Sia, it should be very similar) <https://siasetup.info/guides/renting_on_sia>. Please contact any Guides or Founders with questions, and to see if renting is right for your needs.`)
            .catch(error => console.log(`Unable to send message ${message.author} because of: ${error}`))
            return message.guild.channels.find("name", "bot-logs").send(`<@${message.author.id}> used the Renting command in ${message.channel}`);
          }
        }
      }
  });

client.login(config.token);