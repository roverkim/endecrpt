/////////////////////////////// /* Questions for Inquirer */ ////////////////////////////////////////////////////

var questionObject = {

  enOrDeprompt : [{
      type: 'list',
      message: 'Encrypt or Decrpyt?',
      name: 'enOrDe',
      choices: ['Encypt', 'Decrpyt']
  }],
  enterWordPrompt : [{
    type: "input",
    message: "Please input a word ",
    name: "inputWord",
    validate: function(value) { // Validation to ensure user does not submit empty input.
      return value.length > 1? (RegExp(/[^a-z ]/gi).test(value) == false ? true : "Please Input a Word or Phrase that contains no numbers or special characters.") : "Please Input a Word!";
    }
  }],
  enterHashWordPrompt : [{
    type: "input",
    message: "Please input hashed word",
    name: "hashedWord",
    validate: function(value) { // Validation to ensure user does not submit empty input.
      return value.length == 44? true : "Hash needs to be 44 characters";
    }
  }],
  enterSecretPrompt : [{
    type: "input",
    message: "Please input a secret word or phrase. Case Sensitive",
    name: "inputSecret",
    validate: function(value) { // Validation to ensure user does not submit empty input.
      return value.length > 1? true : "Please Input a Word or Phrase!";
    }
  }],
  continue : [{
      type: 'list',
      message: 'Do you want to continue?',
      name: 'continue',
      choices: ['yes', 'no']
  }]


}; // End of Question Object


module.exports = questionObject;
