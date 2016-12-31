'use strict'

module.change_code = 1
var req = require('request')
var alexa = require('alexa-app')
var app = new alexa.app('sensi-skill')

app.error = function( exception, request, response ) {
  console.log(exception)
  console.log(request)
  console.log(response)
  response.say('Sorry an error occured ' + error.message)
}

var utterancesDict = {
  'fanOn': ['fan on'],
  'fanOff': ['fan off'],
  'fan': ['fan status'],
  'modeHeat': ['set heat'],
  'modeCool': ['set cool'],
  'modeOff': ['off'],
  'mode': ['mode'],
  'temp': ['temperature'],
  'tempSet': ['set temperature {temperature}']
}

var sensiRequest = function(endpoint, cb) {
  req('https://14b666ed.ngrok.io/' + endpoint, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      return cb(body)
     } else {
      return cb(err)
     }
  })
}

app.intent('fanOn',
  {
    "slots":{},
    "utterances": utterancesDict['fanOn']
  },
  function(request,response) {
    sensiRequest('fan_on', function callback(resp) {
      response.say(resp)
      response.send();
    })
  return false
  }
)

app.intent('fanOff',
  {
    "slots":{},
    "utterances": utterancesDict['fanOff']
  },
  function(request,response) {
    samsungRequest('fan_off', function callback(resp) {
      response.say(resp)
      response.send();
    })
    return false
  }
)

app.intent('fan',
  {
    "slots":{},
    "utterances": utterancesDict['fan']
  },
  function(request,response) {
    samsungRequest('fan', function callback(resp) {
        response.say(resp)
        response.send();
    })
    return false
  }
)

app.intent('modeHeat',
  {
    "slots":{},
    "utterances": utterancesDict['modeHeat']
  },
  function(request,response) {
    samsungRequest('mode_heat', function callback(resp) {
      response.say(resp)
      response.send()
    })
    return false
  }
)

app.intent('modeCool',
  {
    "slots":{},
    "utterances": utterancesDict['modeCool']
  },
  function(request,response) {
    samsungRequest('mode_cool', function callback(resp) {
      response.say(resp)
      response.send()
    })
    return false
  }
)

app.intent('modeOff',
  {
    "slots":{},
    "utterances": utterancesDict['modeOff']
  },
  function(request,response) {
    samsungRequest('mode_off', function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

app.intent('mode',
  {
    "slots":{},
    "utterances": utterancesDict['mode']
  },
  function(request,response) {
    samsungRequest('mode', function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

app.intent('temp',
  {
    "slots":{},
    "utterances": utterancesDict['temp']
  },
  function(request,response) {
    samsungRequest('temp', function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

app.intent('tempSet',
  {
    "slots":{'temperature': 'NUMBER'},
    "utterances": utterancesDict['modeOff']
  },
  function(request,response) {
    var temp = request.slot('temperature')
    samsungRequest('temp_set?temp=' + temp, function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

module.exports = app
