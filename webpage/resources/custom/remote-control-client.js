'use strict';

var pubnub = new PubNub({
    publishKey: 'pub-c-ef4574e7-a152-4e2b-a9ab-491a543dc7c5',
    subscribeKey: 'sub-c-b86c91ae-6e8b-11ea-895f-e20534093ea4',
    ssl: true
});

pubnub.addListener({
    message: function(event) {
        var message = event.message;
        jQuery('#display').text(message.slide + '.' + message.part);
    }
});

pubnub.subscribe({
    channels: ['output']
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('.btn').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
});
