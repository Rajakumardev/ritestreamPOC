const apiToken = "redacted", // - please add a valid token
    clientId = "redacted", // - please add a valid clientid
    url = "https://content.allrites.com/api/video",
    videoId = "";
const hlsjsDefaults = {
    debug: true,
    enableWorker: true,
    liveBackBufferLength: 60 * 15
};
let player = document.querySelector('#player');
function getVideo(id) {
    const videoUrl = url + '?token=' + apiToken + '&video_id=' + id;

    fetch(videoUrl, (data) => {
        console.log(data);
    });
}
function sendPing() {
    let urlString = 'https://content.allrites.com/api/api-activity?token=' + apiToken + '&company_id=' + clientId + '&device=hlsjs';
    fetch(urlString, {
        method: 'POST',
        header: {
            "Content-Type": "application/json; charset=utf-8",
        }
    }, (data) => {
        console.log(data);
    });
    // $.ajax({
    //     type: "POST",
    //     url: urlString,
    //     contentType: "application/json; charset=utf-8",
    //     crossDomain: true,
    //     dataType: "json",
    //     success: function (data, status, jqXHR) {
    //         console.log("sendPing successfully");
    //         console.log(data);
    //     },

    //     error: function (jqXHR, status) {
    //         // error handler
    //         console.log("sendPing error: " + status.code);
    //         console.log(jqXHR);
    //     }
    // });
}
function loadStream() {
    if (Hls.isSupported()) {
        // button.innerHTML = 'Loading';
        var hls = new Hls(hlsjsDefaults);
        hls.loadSource('https://premiummovies.s3-us-west-2.amazonaws.com/4/4/play.m3u8');
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            player.play();
            //   button.innerHTML = 'Play';
            //   button.addEventListener('click',play);
        });
        hls.on(Hls.Events.ERROR, function (err) {
            console.log(err)
        })
    } else {
        //    button.innerHTML = 'Not Supported';
    }
}
sendPing();
getVideo(4);
loadStream();