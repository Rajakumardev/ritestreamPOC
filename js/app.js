const apiToken = "", // - please add a valid token
    clientId = "", // - please add a valid clientid
    url = "https://content.allrites.com/api/video",
    videoId = "";
const hlsjsDefaults = {
    debug: true,
    enableWorker: true,
    liveBackBufferLength: 60 * 15
};
let player = document.querySelector('#player');
async function getVideo(id) {
    console.log("getvideo")
    const videoUrl = url + '?token=' + apiToken + '&video_id=' + id;

    const response = await fetch(videoUrl);
    console.log(await response.json())
}
async function sendPing() {
    console.log("sendping");
    let urlString = 'https://content.allrites.com/api/api-activity?token=' + apiToken + '&company_id=' + clientId + '&device=hlsjs';
    const response = await fetch(urlString, {
        method: 'POST',
        header: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
    console.log(await response.json());
}
function loadStream() {
    console.log("loadstream")
    if (Hls.isSupported()) {
        // button.innerHTML = 'Loading';
        var hls = new Hls(hlsjsDefaults);
        hls.loadSource('https://premiummovies.s3-us-west-2.amazonaws.com/4/4/play.m3u8');
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            player.muted = true;
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
async function main() {
    await sendPing();
    await getVideo(4);
    await loadStream();
}

main();