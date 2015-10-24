
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
