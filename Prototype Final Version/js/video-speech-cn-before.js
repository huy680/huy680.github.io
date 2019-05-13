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

	// Get some required handles
	var video = document.getElementById('v');
	// var recStatus = document.getElementById('recStatus');
	// var startRecBtn = document.getElementById('startRecBtn');
	// var stopRecBtn = document.getElementById('stopRecBtn');

	video.controls = false;
	// video.autoplay = true;
	video.load();

	var nodes = {
    start: document.querySelector('[data-start]'),
    speech: document.querySelector('[data-speech]'),
    speechInner: document.querySelector('[data-speech] > p')
  };


	var a = document.getElementById("clickme"),
		count = 0;
	a.onclick = function() {
		count += 1;
		  // a.innerHTML = "Click me: " + count;
		console.log("click me" + count);  
	};


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
		rec.lang = 'zh-CN';


			// speech recognition started
	  rec.onstart = function() {

	  	if (count <= 1){
	    	recognizing = true;
	        nodes.start.classList.add('active');
	        nodes.speech.classList.add('active');
		    video.currentTime = 0;
			video.play();
			video.addEventListener('timeupdate', time1function);
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

			       				if (userSaid(str, '有期')) {

			       					video.currentTime = 25;
			       					video.play();
			       					video.addEventListener('timeupdate', time1function);
			       					video.addEventListener('seeking', undefinedtime);
			       					// video.played.end(4);

			       				}
			       				// Play the video from 25 second
			       				else if (userSaid(str, '巴山夜雨涨秋池')) {
			       					video.currentTime = 50;
			       					video.play();
			       					video.addEventListener('timeupdate', time2function);
			       					video.addEventListener('seeking', undefinedtime);

			       				}
			       				// play the video from 40 second
			       				else if (userSaid(str, '何当共剪西窗烛')) {
			       					video.currentTime = 1*60+7;
			       					video.play();
			       					video.addEventListener('timeupdate', time2function);
			       					video.addEventListener('seeking', undefinedtime);

			       				}
			       				// play the video from 50 second
			       				else if (userSaid(str, '却话巴山夜雨时')) {
			       					video.currentTime = 1*60+22;
			       					video.play();
			       					video.addEventListener('timeupdate', time1function);
			       					video.addEventListener('seeking', undefinedtime);

			       				}
			       				else if (userSaid(str, '重新开始')) {
			       					video.currentTime = 0;     //1*60+22
			       					video.play();
			       					video.addEventListener('timeupdate', time1function);
			       					video.addEventListener('seeking', undefinedtime);

			       				}
			       				else{
			       					nodes.speechInner.innerHTML = '重新朗诵该句 或者 说 "重新开始" 从头开始体验'
			       				}

	       			}
	        	}
	    	}
		};
      

      function time1function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 24.59) video.pause();
      }

      function time2function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 14.59) video.pause();
      }
      function time3function(){
      	 if (!video._startTime) video._startTime = video.currentTime;

		 var playedTime = video.currentTime - video._startTime;

		 if (playedTime >= 9.59) video.pause();
      }
	  // function time4function(){
   //    	 if (!video._startTime) video._startTime = video.currentTime;

		 // var playedTime = video.currentTime - video._startTime;

		 // if (playedTime >= 0.59) video.pause();
   //    }
      function undefinedtime(){
      	video._startTime = undefined;
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

	  document.getElementById('v').addEventListener('ended', function(e) {
    	console.log('video ended');
        location.href = location.href;
    })

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