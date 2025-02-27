/**
 * Created by roylee on 18/05/2015.
 */

var jQuery =  {
  hubConnection: createMockHubObject
};

function createMockHubObject () {
  'use strict';

  var connection = {
    createHubProxy: function (hubName) {
      return new HubProxy(hubName);
    },
    start: function(transObj) {},
    stop: function() {},
    error: function(fn) {},
    stateChanged: function(fn) {}
  };

  return connection;
}


function HubProxy ( hubName ) {
  'use strict';

  this._listeners = {};

  this.on = function (ev, fn) {
    (this._listeners[ev] = this._listeners[ev] || []).push(fn);
  };

  this.off = function (ev, fn) {

    if(ev) {
      var index = this._listeners[ev].indexOf(fn);
      if(index > -1) {
        this._listeners[ev].splice(index, 1);
      } else {
        delete this._listeners[ev];
      }
    }

  };

  this.invoke = function (ev, data) {
    var listeners = this._listeners[ev];
    if(listeners) {
      var args = arguments;
      listeners.forEach(function(listener){
        listener.apply(null, Array.prototype.slice.call(args, 1));
      });
    }
  };
}


