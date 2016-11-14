'use strict';

var fs = require('fs');
var path = require('path');

var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];


if (cmd === 'read') {
  var index = process.argv[3];

  fs.readFile(petsPath, 'utf8', function(err, data) {

    var pets = JSON.parse(data);
    if (err) {
      throw err;
    }
    //get pet index code
    else if(index === undefined){
      console.log(pets);
      // process.exit(1);
    }
    else if (index > pets.length -1 || index < 0){
      console.error(`Usage: ${node} ${file} INDEX`);
      // process.exit(1);
    }
    else {
      var pet = pets;
      console.log(pet[index]);
    }


    //get pet index code
  });
}
else if (cmd === 'create') {

  var age =  parseInt(process.argv[3]);
  var kind = process.argv[4];
  var name = process.argv[5];

  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var pet = {
      'age': age,
      'kind': kind,
      'name': name
    };
    // pets.push(pet);
    // pet.age = parseInt(process.argv[3]);
    // pet.kind = process.argv[4];
    // pet.name = process.argv[5];

    if (pet.age === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (pet.kind === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (pet.name === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === 'update') {
  var index = process.argv[3];
  var age =  parseInt(process.argv[4]);
  var kind = process.argv[5];
  var name = process.argv[6];

  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      console.log("there was an error");
      throw readErr;
    }

    var pets = JSON.parse(data);
    var pet = {
      'age': age,
      'kind': kind,
      'name': name
    };
    pets[index] = pet;
    var petsJSON = JSON.stringify(pets);

    // pet.age = parseInt(process.argv[3]);
    // pet.kind = process.argv[4];
    // pet.name = process.argv[5];

    if (pet.age === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (pet.kind === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (pet.name === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }



    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets);
    });
  });
}


else if (cmd === 'destroy'){

  var index = process.argv[3];


  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      console.log("there was an error");
      throw readErr;
    }

    var pets = JSON.parse(data);
    var petsJSON = JSON.stringify(pets);

    pets.splice(index, 1);


    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets);
    });
  });


}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
