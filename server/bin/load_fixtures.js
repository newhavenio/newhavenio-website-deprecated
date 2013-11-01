var mongoose = require('mongoose'),
	fs = require('fs'),
	path = require('path'),
    _ = require('underscore');

// Load up models
var models_path = path.join(__dirname, '../models');
fs.readdirSync(models_path).forEach( function(file){
	require(models_path + '/' + file);
});

// Connect to database
console.log(process.env.MONGOHQ_URL);
mongoose.connect(process.env.MONGOHQ_URL);

function getRand(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}

function getRandUsername(name){
	return name + Math.floor(Math.random() * 1000);
}

function getRandEmail(name){
	return getRandUsername(name) + '@' + getRand(['yahoo', 'gmail', 'hotmail']) + '.com';
}

gravatars = [
	"https://0.gravatar.com/avatar/11bf1791030dc3edcc6a7b043eb9c8f0",
	"https://0.gravatar.com/avatar/4021c2acfc5b98b6dfe2d0ec26432ce1",
	"https://0.gravatar.com/avatar/695304a57250d83374cecf9dc2a2f99a",
	"https://0.gravatar.com/avatar/70d9994591a6dcf6e049e75d8e32fe4b",
	"https://0.gravatar.com/avatar/aaefc9b41efd5ce4a3bb41b2986ee14c",
	"https://0.gravatar.com/avatar/bbfc1072b04716d11d2c40e90a7b0379",
	"https://0.gravatar.com/avatar/c00e439ba2e7ebbe9fcf74660d46a574",
	"https://0.gravatar.com/avatar/dfb248d98bc7c238fccd5aad53624eab",
	"https://0.gravatar.com/avatar/f1a15d42781516879dab863cc5f46297",
	"https://0.gravatar.com/avatar/f39ea690d8d5a45418a4cc7066f77648",
	"https://0.gravatar.com/avatar/f3b2217f8ebef82882e073b1efcd6ca3",
	"https://0.gravatar.com/avatar/fc5dc0d579fb554752763792a2d5f449",
	"https://1.gravatar.com/avatar/3c0ca2c60c5cc418c6b3dbed47b23b69",
	"https://1.gravatar.com/avatar/9497d7ecb5a0d4b5e5ffdc72f2b7b75d",
	"https://1.gravatar.com/avatar/9a952bcf6fd701bb1303cd9f64cf9620",
	"https://1.gravatar.com/avatar/ab6605de462f0316e5bf4c1f5eafdd04",
	"https://1.gravatar.com/avatar/d94bd45a3f4cca35b97ead2a04ddd832",
	"https://1.gravatar.com/avatar/e7591fc2ef5b6733035b570ae7942b47",
	"https://2.gravatar.com/avatar/009f8ebb463b7021735e41a3e9c6c970",
	"https://2.gravatar.com/avatar/255efbcc8b8548238b757e97be96b27f",,
	"https://2.gravatar.com/avatar/33c29f2b85e5e80bdcec71c6e3f5a78a",
	"https://2.gravatar.com/avatar/34f3e6c9a5a1649db9c86b79d83fe99e",
	"https://2.gravatar.com/avatar/52bc10d5219bf5582ca8a6860437a22a",
	"https://2.gravatar.com/avatar/61727cdcb8022665854992fd404ad96a",
	"https://2.gravatar.com/avatar/721cc7667947af96cc416729fc497107",
	"https://2.gravatar.com/avatar/9bb671dc092b0ea696e39a85dbb23019",
	"https://2.gravatar.com/avatar/b77bc0fa07a2035ee19a1d4fdd5b0a93",
	"https://2.gravatar.com/avatar/c7234ffc3f957fd5a6c566705c41f5e5",
	"https://2.gravatar.com/avatar/c8475420ebca73833e55ccf57d8d7500",
	"https://2.gravatar.com/avatar/fd3f504ce98043555d6fddeb5a2dd290"
];
gravatars.sort(function() {return 0.5 - Math.random()})

firstNames = ["Kyle", "Dan", "Chris", "Joel", "Adam", "Zack", 'Josh', 'Gilman', 'Mike', 'Kathy', 'Charlotte', 'Amanda', 'Jenny', 'Qiong'];
lastNames = ["Jones", "Farrel", "Davidson", "Lopez", "Sandler", "Johnson", 'Miller', 'Carlson', 'Sena', 'Paulson'];

lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function addSocialLinks(user){
	if (Math.random() < 0.7){
		user.twitterUrl = getRandUsername(user.firstName);
	}
	if (Math.random() < 0.7){
		user.linkedinUrl = '/' + getRandUsername(user.firstName);
	}
	if (Math.random() < 0.7){
		user.blog = 'http://www.' + getRandUsername(user.firstName) + '.com/';
	}
}

// Let's create some users!
var User = mongoose.model('User');

var numUsers = 20;
var j = 0;
function tryExit(){
	j += 1;
	if (j == numUsers){
		console.log("Created ", numUsers, "users");
		process.exit();
	}
}
for (var i = 0; i < numUsers; i++) {
	user = new User;
	firstName = getRand(firstNames);
	lastName = getRand(lastNames);
	user.githubAccessToken = 'sdfsdfsdfsdf1112sdsfd';
	user.githubInfo = {
		id: Math.random() * 10000,
		login: getRandUsername(firstName),
		name: firstName + " " + lastName,
		avatar_url: gravatars[i],
		email: getRandEmail(firstName)
	};
    user.populateFromGithub();
    addSocialLinks(user);

    // Save the user
    user.save(tryExit, function(err){
    	console.log("there was an error:", err);
    	tryExit();
    });
};

