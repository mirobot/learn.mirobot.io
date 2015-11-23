function click(el, fn){
  el = document.querySelector(el);
  el.addEventListener('click', fn);
}

function Calibrator(){
  this.updateConnectionState();
  this.setupInit();
  this.setupSlack();
  this.setupDistance();
}

Calibrator.prototype = {
  connected: false,
  slackCal: 0,
  moveCal: 1,
  setupInit: function(){
    var self = this;
    this.connectButton = document.querySelector('#init #connect')
    this.connectButton.addEventListener('click', function(){ self.connect(); });
  },
  setupSlack: function(){
    var self = this;
    click('#slack #start', function(){ self.setSlackCal(self.slackCal); });
    click('#slack #stop', function(){ self.mirobot.stop(); });
    click('#slack #more', function(){ self.setSlackCal(self.slackCal + 1); });
    click('#slack #less', function(){ self.setSlackCal(self.slackCal - 1); });
  },
  setSlackCal: function(amount){
    if(amount < 0) amount = 0;
    this.slackCal = amount;
    document.querySelector('#slack .steps').innerHTML = this.slackCal;
    this.mirobot.calibrateSlack(amount);
  },
  getSlackState: function(){
    var self = this;
    this.mirobot.slackCalibration(function(e, msg){
      self.slackCal = Number(msg.msg);
      document.querySelector('#slack .steps').innerHTML = self.slackCal;
    });
  },
  setupDistance: function(){
    var self = this;
    click('#distance #draw', function(){ self.distanceDraw(); });
    click('#distance #calibrate', function(){ self.distanceCal(); });
  },
  distanceDraw: function(){
    var self=this;
    var distance = Number(document.querySelector('#distance .desired').value);
    document.querySelector('#distance .stepone').style.display = 'none';
    document.querySelector('#distance .steptwo').style.display = '';
    this.mirobot.pendown(function(e){
      if(e === 'complete'){
        self.mirobot.forward(distance, function(e){
          if(e === 'complete'){
            document.querySelector('#distance .steptwo').style.display = 'none';
            document.querySelector('#distance .stepthree').style.display = '';
          }
        })
      }
    })
  },
  getDistanceState: function(){
    var self = this;
    this.mirobot.moveCalibration(function(e, msg){
      self.moveCal = Number(msg.msg);
    });
  },
  distanceCal: function(){
    var desired = Number(document.querySelector('#distance .desired').value);
    var actual = Number(document.querySelector('#distance .actual').value);
    var correctedActual = actual / this.moveCal;
    var newCal = desired / correctedActual;
    this.mirobot.calibrateMove(newCal, function(e){
      if(e === 'complete'){
        this.mirobot.calibrateTurn(newCal, function(e){
          if(e === 'complete'){
            document.querySelector('#distance .stepthree').style.display = 'none';
            document.querySelector('#distance .stepfour').style.display = '';
          }
        })
      }
    })
  },
  connect: function(){
    var self = this;
    var address = document.querySelector('#address').value;
    if(address === ''){
      document.querySelector('#init .message').innerHTML = "Please enter a valid address";
      return;
    }
    this.mirobot = new Mirobot('ws://' + address + ':8899/websocket');
    this.mirobot.addListener(function(e){ self.mirobotHandler(e); })
  },
  mirobotHandler: function(e){
    if(e === 'connected'){
      this.connected = true;
      this.updateConnectionState();
      this.getSlackState();
      this.getDistanceState();
      document.querySelector('#init .message').innerHTML = "Successfully connected";
    }
  },
  updateConnectionState: function(){
    var setDisabled = function(state){
      var buttons = document.querySelectorAll('.cal.connectrequired button');
      for(var i = 0; i< buttons.length; i++){
        buttons[i].disabled = state;
      }
    }
    if(this.connected){
      document.body.className = 'connected';
      setDisabled('');
    }else{
      document.body.className = 'disconnected';
      setDisabled('disabled');
    }
  }
}


function load(){
  if(!!window.Mirobot){
    new Calibrator();
  }else{
    window.setTimeout(load, 500);
  }
}

load();