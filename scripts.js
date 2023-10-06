let states = {
    player: {
        victory: 0,
        defeat: 0,
    },
    result: '',
    status: ''
}

const fs = require('fs');

function levelPlayer() {
    states.result = states.player.victory - states.player.defeat

    if (states.result <= 10) {
        if (states.result < 0) {
            states.result = 0
        }
        states.status = 'Ferro'
    } else if (states.result >= 11 && states.result <= 20) {
        states.status = 'Bronze'
    } else if (states.result >= 21 && states.result <= 50) {
        states.status = 'Prata'
    } else if (states.result >= 51 && states.result <= 80) {
        states.status = 'Ouro'
    } else if (states.result >= 81 && states.result <= 90) {
        states.status = 'Diamante'
    } else if (states.result >= 91 && states.result <= 100) {
        states.status = 'Lendário'
    } else if (states.result >= 101) {
        states.status = 'Imortal'
    }
}

function randomTrueFalse() {
    const number = Math.floor(Math.random() * 2) + 1;

    if (number == 2) {
        return true
    } else {
        return false
    }
    
}

function numberRandom() {
    const number = Math.floor(Math.random() * (6000 + 1)) + 1
    return number
}

function addMatches(matches, id) {
    let count = id + 1
    let number = numberRandom()
    
    while (count < number) {
        object = {
            "id" : count,
            "result" : randomTrueFalse()
        }
        matches.push(object)
        count++
    }

    return matches
}

// Lê o conteúdo do arquivo JSON
fs.readFile('player.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  try {
    // Analisa o conteúdo JSON para um objeto JavaScript
    const objetoJSON = JSON.parse(data);
    let matches = objetoJSON.player.matches

    matches = addMatches(matches, matches.length)
    for(i = 0; i < matches.length; i++)
    {
        if(matches[i].result) {
            states.player.victory ++
        } else if (!matches[i].result)
        {
            states.player.defeat ++
        }
    }

    levelPlayer()
    console.log(`O Herói tem de saldo de ${states.result} está no nível de ${states.status}`)

  } catch (error) {
    console.error('Erro ao analisar o JSON:', error);
  }
});
