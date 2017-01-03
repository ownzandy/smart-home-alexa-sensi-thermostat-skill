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
  'modeHeat': ['heat'],
  'modeCool': ['cool'],
  'modeOff': ['off'],
  'status': ['state'],
  'tempSet': ['set temperature {temperature}']
}

var sensiRequest = function(endpoint, cb) {
  req(process.env.SERVER_URL + '/sensi' + endpoint, function (err, response, body) {
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
    sensiRequest('/fan_on', function callback(resp) {
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
    sensiRequest('/fan_off', function callback(resp) {
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
    sensiRequest('/mode_heat', function callback(resp) {
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
    sensiRequest('/mode_cool', function callback(resp) {
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
    sensiRequest('/mode_off', function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

app.intent('status',
  {
    "slots":{},
    "utterances": utterancesDict['status']
  },
  function(request,response) {
    sensiRequest('/status', function callback(resp) {
      response.say(resp)
      response.send();
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
    sensiRequest('/temp_set?temp=' + temp, function callback(resp) {
        response.say(resp)
        response.send()
      })
    return false
  }
)

module.exports = app
