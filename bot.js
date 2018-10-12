var Discord = require('discord.js');

var auth = require('./auth.json');
var names = require('./names.json');
var emotes = require('./emotes.json');
const crow = '127651916254543872';
const tree = '85614143951892480';
const bot = '429357061126750208';
const uberbot = '85614143951892480';

var messageMap = new Object();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content.toLowerCase().includes('!help')){

	msg.channel.send('\n ```Commands:\n 1. Randomize me captain\n 2. Strip me \n 3. Cowboy baby \n 4. Knock Me Off \n 5. Pole rider \n 6. Allstar me bruh\n```');

  }

  if (msg.member.id !== bot && msg.content.toLowerCase().includes('fire truck') || msg.content.toLowerCase().includes('firetruck')) {
	msg.channel.send('[Visibly excited] FIRE TRUCK');
}
  

  if (msg.content.toLowerCase().includes('!randomize me captain') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randName();
	try{
		msg.member.setNickname(name);
		msg.channel.send('Shazam! You\'re now: '+ name + '.');
	}
	catch(err){
	}

  }

  if (msg.content.toLowerCase().includes('!strip me') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randStripper();

	try{

		msg.member.setNickname(name);
		msg.channel.send('Well helllllo there '+ name + '.');

	}
	catch(err){


	}
  }

  if (msg.content.toLowerCase().includes('!cowboy baby') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randCountry();

	try{

		msg.member.setNickname(name);
		msg.channel.send('Yeeehaw! Give a rowdy howdy to ' + name + '.');

	}
	catch(err){


	}
  }

  if (msg.content.toLowerCase().includes('!knock me off') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randPepper();

	try{

		msg.member.setNickname(name);
		msg.channel.send('Try a cool, refreshing ' + name + '.');

	}
	catch(err){


	}
  }

  if (msg.content.toLowerCase().includes('!pole rider') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randStripperCountry();

	try{

		msg.member.setNickname(name);
		msg.channel.send('Save a horse, ride a '+ name + '.');

	}
	catch(err){


	}
  }

  if (msg.content.toLowerCase().includes('!allstar me bruh') && msg.member.id !== tree && msg.member.id !== crow) {

	var name = randAllstar();

	try{

		msg.member.setNickname(name);
		msg.channel.send('<:multithonk:351969196349063168> uR nOw: '+ name + '.');

	}

	catch(err){


	}
	
	
  }

									    //Probably Ultragunner's ID?
  if(msg.content.toLowerCase().includes('ultragunner') && msg.member.id !== '429357061126750208'){

	msg.channel.send( '<:I1:454503952369844244> ULTRAGUNNER <:I1:454503952369844244>' );
	
  }


});

client.login(auth.token);

function randName(){

	var index = Math.floor(Math.random()*names.arr.length);
	return names.arr[index];

}

function randStripper(){

	var i0 = Math.floor(Math.random()*names.combo0_stripper.length);
	var i1 = Math.floor(Math.random()*names.combo1_stripper.length);
	var i2 = Math.floor(Math.random()*names.combo2_stripper.length);
	
	var name = names.combo0_stripper[i0] + ' ' + names.combo1_stripper[i1] + names.combo2_stripper[i2];

	if(name.length > 32){
		return randStripper();
	}

	return name;

}

function randCountry(){

	var i0 = Math.floor(Math.random()*names.combo0_country.length);
	var i1 = Math.floor(Math.random()*names.combo1_country.length);
	var i2 = Math.floor(Math.random()*names.combo2_country.length);
	
	var name = names.combo0_country[i0] + ' \"' + names.combo1_country[i1] + '\" ' + names.combo2_country[i2];

	if(name.length > 32){
		return randCountry();
	}

	return name;

}

function randStripperCountry(){

	var i0 = Math.floor(Math.random()*names.combo0_country.length);
	var i1 = Math.floor(Math.random()*names.combo1_stripper.length);
	var i2 = Math.floor(Math.random()*names.combo2_stripper.length);
	var i3 = Math.floor(Math.random()*names.combo2_country.length);

	var name = names.combo0_country[i0] + ' \"' + names.combo1_stripper[i1] + names.combo2_stripper[i2] + '\" ' + names.combo2_country[i3];

	if(name.length > 32){
		return randStripperCountry();
	}

	return name;
	
}

function randPepper(){

	var i0 = Math.floor(Math.random()*names.combo0_pepper.length);
	var i1 = Math.floor(Math.random()*names.combo1_pepper.length);
	
	var name = names.combo0_pepper[i0] + ' ' + names.combo1_pepper[i1];

	if(name.length > 32){
		return randPepper();
	}

	return name;

}

function randAllstar(){

	var index = Math.floor(Math.random()*names.allstar.length);
	return names.allstar[index];

}

