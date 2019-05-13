(function() {

    // check for SpeechRecognition API
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return false;
    }

    var rec = new webkitSpeechRecognition(),
        recognizing = false,
        ignoreOnEend,
        tartTimestamp,
        recognizing,
        finalTranscript;

    var coloractive = document.getElementById('speechicon');
    if(recognizing){
    	coloractive.style.color ="#F9F6EE";
    }else{
    	coloractive.style.color = "#6F7E81";
    }

	// Get some required handles
	var video = document.getElementById('v');
	var audio1 = document.getElementById('1sectionsound');
	var audio2 = document.getElementById('2sectionsound');
	var audio3 = document.getElementById('3sectionsound');
	var audio4 = document.getElementById('4sectionsound');
	// var audio5 = document.getElementById('reminder');
	// var recStatus = document.getElementById('recStatus');
	// var startRecBtn = document.getElementById('startRecBtn');
	// var stopRecBtn = document.getElementById('stopRecBtn');

	video.controls = false;
	// video.autoplay = true;
	video.load();

	audio1.controls = false;
	audio1.load();

	audio2.controls = false;
	audio2.load();

	audio3.controls = false;
	audio3.load();

	audio4.controls = false;
	audio4.load();

	// audio5.controls = false;
	// audio5.load();

	var nodes = {
    start: document.querySelector('[data-start]'),
    speech: document.querySelector('[data-speech]'),
    speechInner: document.querySelector('[data-speech] > p')
  };

// count the times mic button was clicked
	var a = document.getElementById("clickme"),
		count = 0;
	a.onclick = function() {
		count += 1;
		  // a.innerHTML = "Click me: " + count;
		console.log("click me" + count);  
	};

		// $("body").overhang({
		//   type: "warn",
		//   message: "If active, icon turns red",
		//   duration: 3,
		//   overlay: true
		// });


	// Define a new speech recognition instance
	// var rec = null;
	// try {
	// 	rec = new webkitSpeechRecognition();
	// } 
	// catch(e) {
 //    	document.querySelector('.msg').setAttribute('data-state', 'show');
 //    	startRecBtn.setAttribute('disabled', 'true');
 //    	stopRecBtn.setAttribute('disabled', 'true');
 //    }
    if (rec) {
		rec.continuous = true;
		rec.interimResults = false;
		rec.lang = 'en';


			// speech recognition started
	  rec.onstart = function() {
	    coloractive.style.color ="#F9F6EE";
	    if (count <= 1){
	    	recognizing = true;
	        nodes.start.classList.add('active');
	        nodes.speech.classList.add('active');
		    video.currentTime = 0;
			video.play();
			video.addEventListener('timeupdate', time4function);
			video.addEventListener('seeking', undefinedtime);
	    }else{
			recognizing = true;
	        nodes.start.classList.add('active');
	        nodes.speech.classList.add('active');
	    }

	  };
	  
	  // speech recognition end
	  rec.onend = function(event) {
	    recognizing = false;
	    nodes.start.classList.remove('active');
	    nodes.speech.classList.remove('active');
	    coloractive.style.color = "#6F7E81";
	  };


		// Define a threshold above which we are confident(!) that the recognition results are worth looking at 
		var confidenceThreshold = 0.5;

		// Simple function that checks existence of s in str
		var userSaid = function(str, s) {
			return str.indexOf(s) > -1;
		}

		// Highlights the relevant command that was recognised in the command list for display purposes
		// var highlightCommand = function(cmd) {
		// 	var el = document.getElementById(cmd); 
		// 	el.setAttribute('data-state', 'highlight');
		// 	setTimeout(function() {
		// 		el.setAttribute('data-state', '');
		// 	}, 3000);
		// }

		// Process the results when they are returned from the recogniser
		rec.onresult = function(e) {

			// show speech recognition results
    		nodes.speech.classList.add('active');

			// Check each result starting from the last one
			for (var i = e.resultIndex; i < e.results.length; ++i) {

                // var transcript = e.results[i][0].transcript.trim().toLowerCase();
                // nodes.speechInner.innerHTML = transcript;

				// If this is a final result
	       		if (e.results[i].isFinal) {
	       			// If the result is equal to or greater than the required threshold
	       			if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
		       			var str = e.results[i][0].transcript;
		       			console.log('Recognised: ' + str);
		       			nodes.speechInner.innerHTML = str;
                            // play the video from 0 second

			       				if (userSaid(str, 'you ask')) {

			       					video.currentTime = 10;
			       					video.play();
			       					video.addEventListener('timeupdate', time1function);
			       					video.addEventListener('seeking', undefinedtime);
			       					audio1.play();

			       					// video.played.end(4);

			       				}
			       				// Play the video from 25 second 
			       				else if (userSaid(str, 'swell')) {
			       					video.currentTime = 20;
			       					video.play();
			       					video.addEventListener('timeupdate', time2function);
			       					video.addEventListener('seeking', undefinedtime);
			       					audio2.play();

			       				}
			       				// play the video from 40 second
			       				else if (userSaid(str, 'when')) {
			       					video.currentTime = 29;
			       					video.play();
			       					video.addEventListener('timeupdate', time3function);
			       					video.addEventListener('seeking', undefinedtime);
			       					audio3.play();

			       				}
			       				// play the video from 50 second
			       				else if (userSaid(str, 'and we')) {
			       					video.currentTime = 37;     //1*60+22
			       					video.play();
			       					video.addEventListener('timeupdate', backtohomefunction);
			       					video.addEventListener('seeking', undefinedtime);
			       					audio4.play();
								    // video.addEventListener('ended', refresh);
			       				}
			       				else if (userSaid(str, 'restart')) {
			       					video.currentTime = 0;     //1*60+22
			       					video.play();
			       					video.addEventListener('timeupdate', time4function);
			       					video.addEventListener('seeking', undefinedtime);


			       				}
			       				else{
			       					nodes.speechInner.innerHTML = 'recite it again or click the home button to restart'
			       					// audio5.play();
			       				}

	       			}
	        	}
	    	}
		};
      

      function time1function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 9.59) video.pause();
      }

      function time2function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 8.59) video.pause();
      }
      function time3function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 7.50) video.pause();
      }
      function time4function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 10.00) video.pause();
      }
      function backtohomefunction(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 8.59) {
		 	video.pause();
		 	location.reload;
		 }
      }

      function undefinedtime(){
      	video._startTime = undefined;
      }

      function refresh(){
      	location.href = location.href;
      }
      

          // record btn - start / stop speech recognition
	  nodes.start.addEventListener('click', function() {
	    if (recognizing) {
	      rec.stop();
	      recognizing = false;
	      return;
	    }
	    
	    rec.start();
	  });
  
	  // speech visual - stop speech recognition
	  nodes.speech.addEventListener('click', function() {
	    rec.stop();
	  });



		// // Start speech recognition
		// var startRec = function() {
		// 	rec.start();
		// 	recStatus.innerHTML = 'recognising';
		// }
		// // Stop speech recognition
		// var stopRec = function() {
		// 	rec.stop();
		// 	recStatus.innerHTML = 'not recognising';
		// }
		// Setup listeners for the start and stop recognition buttons
		// startRecBtn.addEventListener('click', startRec, false);
		// stopRecBtn.addEventListener('click', stopRec, false);
	}
})();