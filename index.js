/////////////////////////////////////////////// /* Impots */ //////////////////////////////////////////////////
const fs = require('fs');
const CryptoJS = require('crypto-js');
const inquirer = require('inquirer');
const questions = require('./prompts');

const algorithm = 'aes-256-ctr';

/////////////////////////////////////////////// /* Main */ //////////////////////////////////////////////////
function encryptKeys() {

  inquirer.prompt(questions.enterWordPrompt).then(word => {

    let regexPassword = word.inputWord.replace(/[^a-z]/gi, '');

    inquirer.prompt(questions.enterSecretPrompt).then(secret => {

      let encryptedText = CryptoJS.AES.encrypt(regexPassword, secret.inputSecret);

      let writeToFile = (number = 1) => {
        fs.appendFileSync('results.txt', `${number}) ${encryptedText}\n`, 'utf8');
        inquirer.prompt(questions.continue).then(response => {
          (response.continue == 'yes') ?  encryptKeys() : (() => {
              console.log(' Thank you for using endecrpt. Please keep results.txt securely. \n Do not store your secret online. \n You will need the hash and secret to decrpyt your words.');
              process.exit();
            })();

        }); // End of Third Prompt

      }; // writeToFile


      fs.readFile("./results.txt", "utf8", function(error, data) {
        if (error) {
          console.log('File not found! Creating a new file results.txt');
          writeToFile()
        } else {
          let streamArray = data.split("\n").filter(eachStream => eachStream.length > 1);
          let counter = streamArray.length + 1;
          writeToFile(counter);
        }
      }); // End of ReadFile
    }); // End of Second Prompt
  }); // End of Inital Prompt
}; // End of Encrpyt

function decrpytKeys() {

  inquirer.prompt(questions.enterHashWordPrompt).then(word => {
    let encryptedText = word.hashedWord;
    inquirer.prompt(questions.enterSecretPrompt).then(secret => {

      let bytes = CryptoJS.AES.decrypt(encryptedText.toString(), secret.inputSecret);
      let plaintext = bytes.toString(CryptoJS.enc.Utf8) || 'Decryption Failed';
      console.log(plaintext + '\n');

      inquirer.prompt(questions.continue).then(response => {
        (response.continue == 'yes') ?  decrpytKeys() : (() => {
            console.log(' Thank you for using endecrpt. Please keep results.txt securely. \n Do not store your secret online. \n You will need the hash and secret to decrpyt your words.');
            process.exit();
          })();

      }); // End of Third Prompt



    })

  })

}

inquirer.prompt(questions.enOrDeprompt).then(response => {
  console.log(response.enOrDe);
  switch (response.enOrDe) {
    case 'Encrpyt':
      encryptKeys();
      break;
    case 'Decrpyt':
      decrpytKeys();
      break;
    default:
      encryptKeys();
  }
})
