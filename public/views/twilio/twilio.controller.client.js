(function () {
    angular
        .module("SpeakApp")
        .controller('TwilioController', TwilioController);
    
    function TwilioController($routeParams,
                              $location,
                              $rootScope,
                              UserService,
                              SessionService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.language = $routeParams.language;
        vm.module = $routeParams.module;
        vm.join = join;
        vm.done = done;
        vm.session = {
            caller: $rootScope.user, // current user
            called: null,
            started: new Date(),
            ended: new Date(),
            language: vm.language,
            module: vm.module
        };

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(renderUser);
        }
        init();

        function renderUser(user) {
            vm.session.called = user;
            vm.user = user;
        }

        function join() {
            vm.session.started = new Date();
            console.log($rootScope.user);
            console.log(vm.user);
        }

        function done() {
            vm.session.ended = new Date();
            if(vm.session.called && vm.session.caller && (vm.session.called._id != vm.session.caller._id)) {
                SessionService
                    .createSession(vm.session)
                    .success(function (session) {
                        $location.url('/feedback/'+session._id);
                    });
            } else {
                $location.url('/session');
            }
        }

        var videoClient;
        var activeRoom;
        var previewMedia;
        var identity;
        var roomName;

// Check for WebRTC
        if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
            alert('WebRTC is not available in your browser.');
        }

// When we are about to transition away from this page, disconnect
// from the room, if joined.
        window.addEventListener('beforeunload', leaveRoomIfJoined);

        $.getJSON('/token', function (data) {
            identity = data.identity;

            // Create a Video Client and connect to Twilio
            videoClient = new Twilio.Video.Client(data.token);
            document.getElementById('room-controls').style.display = 'block';

            // Bind button to join room
            var buttonJoin  = document.getElementById('button-join');
            var buttonLeave = document.getElementById('button-leave');

            buttonJoin.onclick = buttonJoinHandler;
            buttonLeave.onclick = buttonLeaveHandler;

            function buttonJoinHandler() {

                // $('#preview')
                //     .css('position', 'absolute')
                //     .css('width', '25%');

                roomName = document.getElementById('room-name').value;
                if (roomName) {
                    log("Joining room '" + roomName + "'...");

                    videoClient.connect({ to: roomName}).then(roomJoined,
                        function(error) {
                            log('Could not connect to Twilio: ' + error.message);
                        });
                } else {
                    alert('Please enter a room name.');
                }
            };

            // Bind button to leave room
            function buttonLeaveHandler() {
                log('Leaving room...');
                activeRoom.disconnect();
            };
        });

// Successfully connected!
        function roomJoined(room) {
            activeRoom = room;

            log("Joined as '" + identity + "'");
            document.getElementById('button-join').style.display = 'none';
            document.getElementById('button-leave').style.display = 'block';

            // Draw local video, if not already previewing
            if (!previewMedia) {
                room.localParticipant.media.attach('#local-media');
            }

            room.participants.forEach(function(participant) {
                log("Already in Room: '" + participant.identity + "'");
                participant.media.attach('#remote-media');
            });

            // When a participant joins, draw their video on screen
            room.on('participantConnected', function (participant) {
                log("Joining: '" + participant.identity + "'");
                participant.media.attach('#remote-media');
            });

            // When a participant disconnects, note in log
            room.on('participantDisconnected', function (participant) {
                log("Participant '" + participant.identity + "' left the room");
                participant.media.detach();
            });

            // When we are disconnected, stop capturing local video
            // Also remove media for all remote participants
            room.on('disconnected', function () {
                log('Left');
                room.localParticipant.media.detach();
                room.participants.forEach(function(participant) {
                    participant.media.detach();
                });
                activeRoom = null;
                document.getElementById('button-join').style.display = 'block';
                document.getElementById('button-leave').style.display = 'none';
            });
        }

//  Local video preview
        document.getElementById('button-preview').onclick = function () {

            $('#preview')
                .css('position', 'relative')
                .css('width', '100%');

            if (!previewMedia) {
                previewMedia = new Twilio.Video.LocalMedia();
                Twilio.Video.getUserMedia().then(
                    function (mediaStream) {
                        previewMedia.addStream(mediaStream);
                        previewMedia.attach('#local-media');
                    },
                    function (error) {
                        console.error('Unable to access local media', error);
                        log('Unable to access Camera and Microphone');
                    });
            }
        };

// Activity log
        function log(message) {
            var logDiv = document.getElementById('log');
            logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
            logDiv.scrollTop = logDiv.scrollHeight;
        }

        function leaveRoomIfJoined() {
            if (activeRoom) {
                activeRoom.disconnect();
            }
        }
    }
})();