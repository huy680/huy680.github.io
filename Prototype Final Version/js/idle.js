idleTimer = null;
idleState = false;
idleWait = 90000;

// 1000 = 1s 10min = 600s = 600000

(function ($) {

    $(document).ready(function () {
    
        $('*').bind('mousemove keydown scroll', function () {
        
            clearTimeout(idleTimer);
                    
            if (idleState == true) { 
                
                // Reactivated event
                // $("body").append("<p>Welcome Back.</p>");   
                console.log("active");         
            }
            
            idleState = false;
            
            idleTimer = setTimeout(function () { 
                     
                // Idle Event
                // $("body").append("<p>You've been idle for " + idleWait/1000 + " seconds.</p>");
              location.href = location.href;
              console.log("idle");  

                idleState = true; }, idleWait);
        });
        
        $("body").trigger("mousemove");
    
    });
}) (jQuery)