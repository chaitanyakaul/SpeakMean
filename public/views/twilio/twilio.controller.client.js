(function () {
    angular
        .module("SpeakApp")
        .controller('TwilioController', TwilioController);
    
    function TwilioController($routeParams,
                              $location,
                              $rootScope,
                              UserService,
                              SessionService,
                              SocketService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.language = $routeParams.language;
        vm.moduleId = $routeParams.module;
        vm.join = join;
        vm.done = done;
        vm.session = {
            learner: $rootScope.user,
            coach: null,
            caller: $rootScope.user, // current user
            called: null,
            started: null,
            ended: null,
            language: vm.language,
            module: vm.moduleId
        };

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(renderUser);
        }
        init();

        function renderUser(user) {
            vm.session.called = user;
            vm.session.coach = user;
            vm.user = user;
            $('input.input-2').val(vm.user.stars);
            // console.log(typeof(user.stars));
        }

        function join() {
            vm.session.started = new Date();
            console.log($rootScope.user);

            // var socket = io('http://localhost:4000');
            // SocketService.socket.on('connect', function(){
            if($rootScope.user.currentRole !== 'COACH') {
                SocketService.socket.emit('spk-msg', {coach: {_id: vm.user._id, username: vm.user.username}, learner: {_id: $rootScope.user._id, username: $rootScope.user.username}});
            }
            // });

            // console.log(vm.user);
        }

        function done() {
            vm.session.ended = new Date();
            SessionService
                .createSession(vm.session)
                .success(function (session) {
                    $location.url('/feedback/'+session._id);
                });
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
                console.log('joined');
                $('#preview')
                    .css({
                        width: '25%',
                        position: 'absolute',
                        bottom: '3px',
                        right: '2px',
                        border: '1px solid white'
                    });
                log("Joining: '" + participant.identity + "'");
                participant.media.attach('#remote-media');
            });

            // When a participant disconnects, note in log
            room.on('participantDisconnected', function (participant) {
                $('#preview')
                    .css({
                        width: '100%',
                        position: 'relative',
                        bottom: '0px',
                        right: '0px',
                        border: 'none'
                    });
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

        function fetchRating() {
            console.log(vm.session.caller.stars);
        }
    }
})();