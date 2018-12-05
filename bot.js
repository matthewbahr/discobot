//Packages
var Discord = require('discord.js');
var fs = require('fs');

//Keys
const crow = '127651916254543872';
const tree = '85614143951892480';
const yourself = '429357061126750208';
const uberbot = '85614143951892480';
const mkFile = 'mk_file.json';

//Json
var auth = require('./auth.json');
var names = require('./names.json');
var emotes = require('./emotes.json');

//Objects
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content.toLowerCase().includes('!help')){

	msg.channel.send('\n ```Commands:\n 1. Randomize me captain\n 2. Strip me \n 3. Cowboy baby \n 4. Knock Me Off \n 5. Pole rider \n 6. Allstar me bruh\n 7. Killed by Millennials```');

  }

  if (msg.member.id !== yourself && msg.content.toLowerCase().includes('fire truck') || msg.content.toLowerCase().includes('firetruck')) {
	msg.channel.send('[Visibly excited] FIRE TRUCK');
  }
  
  if (msg.content.toLowerCase().includes('!killed') && msg.member.id !== yourself){
	mkMap(msg);
  }
  
  if (msg.content.toLowerCase().includes('millennial') && (msg.member.id !== yourself && msg.member.id !== uberbot)){
	mkRandom(msg.channel);
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

function mkMap(msg){
	var content = msg.content;
	content = content.split(" ");

	if(content.length > 1){
		//Content [1] must be a valid operation
		switch(content[1].toLowerCase()) {
			case "add":
				mkAdd(content.slice(1, content.length), msg.channel);
				break;
			case "remove":
				mkRemove(content[2], msg.channel);
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
	}

	else {
		msg.channel.send('Milennials just killed me.\nThanks Obama. <:jeb:245823943854784523>\nProper syntax is `!killed [add, remove, list].`');
	}

	//!killed add "Blah blah" URL
	//killed list
	//killed random?
	//Milennial mention + random milkill fact
}

function mkAdd(contentArr, channel){

	if(contentArr.length < 2){
		channel.send("Proper add format is `!killed add {whatever milennials killed this time} {URL proving they killed it}`");
		return 0;
	}
	var milkill = readMK();
	var url = contentArr[contentArr.length - 1];
	var toJoin = contentArr.slice(1,contentArr.length - 1);
	var content = toJoin.join(" ");

	url = fixURL(url);

	milkill.killed[milkill.keyIndex] = 
			{
				content: content,
				url: url
			};

	outputMK(channel, milkill, milkill.keyIndex);

	milkill.keyIndex = milkill.keyIndex + 1;

	writeMK(milkill);

}

function fixURL(url){
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "https://" + url;
   }
   return url;
}

function mkRemove(id, channel){

	var milkill = readMK();

	delete milkill.killed[id];

	channel.send("Deleted ID:" + id);

	writeMK(milkill);

}

function mkList(channel){

	var milkill = readMK();
	
	var output = "";

	for (key in milkill.killed){
		if(milkill.killed.hasOwnProperty(key)) {
			var datum = milkill.killed[key];
			//outputMK(channel, milkill, key);
			output += "\n" +  structureMKString(channel, milkill, key);
		}
	}

	channel.send(output);

}

function mkRandom(channel){

	var milkill = readMK();

	var randIndex = Math.floor(Math.random() * Object.keys(milkill.killed).length);

	var index = 0;

	for (key in milkill.killed){
		if(index === randIndex){
			//outputMK(channel, milkill, key);
			var datum = milkill.killed[key];
			channel.send("Damn millennials, did you know they killed " + datum.content + "? No seriously, I have proof! <" + datum.url + ">");
			return 0;
		}
		else{
			index = index + 1;
		}
	}

}

function outputMK(channel, milkill, id){

	var output = structureMKString(channel, milkill, id);
	//var datum = milkill.killed[id];
	//channel.send("`" + id + "`  " + datum.content + " <" + datum.url + ">");
	channel.send(output);

}

function structureMKString(channel, milkill, id){

	var datum = milkill.killed[id];
	return "`" + id + "`  " + datum.content + " <" + datum.url + ">";

}

function readMK(){

	var mk = fs.readFileSync('./mk_file.json');
	var parsed = JSON.parse(mk);

	return parsed;

}

function writeMK(milkill){
	fs.writeFileSync('./mk_file.json', JSON.stringify(milkill));
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

