//Packages
var Discord = require('discord.js');
var fs = require('fs');

//Keys
const crow = '127651916254543872';
const tree = '85614143951892480';
const bot = '429357061126750208';
const uberbot = '85614143951892480';
const mkFile = 'mk_file.json';

//Json
var auth = require('./auth.json');
var names = require('./names.json');
var emotes = require('./emotes.json');
var milkill = require(mkfile);

//Objects
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

function milkill(msg){
	var content = msg.content;
	content = content.split(" ");

	//Content [1] must be a valid operation
	switch(content[1].toLowerCase()) {
		case "add":
			mkAdd(content.slice(1, content.length));
			break;
		case "remove":
			mkRemove(content[2]);
			break;
		case "list":
			mkList(msg.channel);
			break;
		case "random":
			mkRandom(msg.channel);
			break;
		default:
			msg.channel.send('Milennials just killed me.\nThanks Obama. <:jeb:245823943854784523>\nProper syntax is `!killed [add, remove, list].`');

	}

	//!killed add "Blah blah" URL
	//killed list
	//killed random?
	//Milennial mention + random milkill fact
}

function mkAdd(contentArr){

	readMK();

	var url = contentArr[contentArr.length - 1];
	var toJoin = contentArr.slice(0,contentArr.length - 1);
	var content = toJoin.join(" ");

	milkill.killed[milkill.keyIndex](
			{
				"content : " + content,
				"url : " + url
			}
		);

	milkill.keyIndex = milkill.keyIndex + 1;

	writeMK();

}

function mkRemove(id){

	readMK();

	milkill.killed[id] = {};

	writeMK();

}

function mkList(channel){

	readMK();

	for (for key in milkill.killed){
		if(milkill.killed.hasOwnProperty(key)) {
			console.log(key + " = " + milkill.killed[key]);
		}
	}

}

function mkRandom(channel){

	readMK();
	var killed = milkill.killed;
	var randIndex = Math.floor(Math.random()*killed.length);

	console.log(killed[randIndex]);

}

function readMK(){
	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
		} else {
			milkill = JSON.parse(data);	
			//obj.table.push({id: 2, square:3}); //add some data
			//json = JSON.stringify(obj); //convert it back to json
			//fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
		}});


}

function writeMK(){
	fs.writeFile(mkFile, milkill, 'utf8');
}

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

