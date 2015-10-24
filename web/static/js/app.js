
// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket";

let channel = socket.channel(`walls:${window.topic}`, {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })


var WallApp = angular.module("wallApp", []);

WallApp.controller("TweetsController", function($scope) {
  this.tweets = [];
  this.greeting =  `Tweets about #${window.topic}`;

  this.listen_to_tweets = function() {
    channel.on("new_tweet", message => { 
      if (!findById(message.id, this.tweets)){
        this.tweets.push(message);
        if (this.tweets.length > 20){
          this.tweets.shift();
        }
        $scope.$apply();
      }
    })
  };

  function findById(id, tweets) {
    return tweets.find(function(tweet) { return tweet.id == id });
  }

});

WallApp.controller("MessagesController", function($scope) {
  this.messages = [];
  this.topic = `#${window.topic}`;

  this.listen_to_chat = function() {
    channel.on("new_msg", message => {
      display_message({body: message.body, user: message.user}, this.messages);
      $scope.$apply();
    })
  };

  this.send_message = function(keyEvent){
    if (keyEvent.which === 13) {
      display_message({body: this.message_box, user: "Me"}, this.messages);
      channel.push("new_msg", {body: this.message_box, user: this.user})
        .receive("ok", payload => console.log('message received') )
        .after(2000, () => console.log("waiting for 2s") );
      this.message_box = null;
    }
  }

  function display_message(message, messages){
    if (messages.indexOf(message) == -1){
      messages.push(message);
    } 
  }

});
