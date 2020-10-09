const TikTokScraper = require('tiktok-scraper');
const utils = require('../utils');

const info = async (link, retryCount = 0, error = null) => {
    // {
    //     "id": "6807491984882765062",
    //     "text": "We’re kicking off the #happyathome live stream series today at 5pm PT!",
    //     "createTime": "1584992742",
    //     "authorMeta": {
    //     "id": "107955",
    //     "secUid": "MS4wLjABAAAAv7iSuuXDJGDvJkmH_vz1qkDZYo1apxgzaxdBSeIuPiM",
    //     "name": "tiktok"
    //     },
    //     "musicMeta": {
    //     "musicId": "6807487887634909957",
    //     "musicName": "original sound",
    //     "musicAuthor": "TikTok"
    //     },
    //     "imageUrl": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/d1b00294a06e488b851ad6553cad41a0_1584992746?x-expires=1602248400&x-signature=V1YD8yL4OoNHN649dxWKLB4TIiI%3D",
    //     "videoUrl": "https://v16-web-newkey.tiktokcdn.com/dd2ed0ade169597c832809922eb0e6d4/5f806c07/video/tos/useast2a/tos-useast2a-ve-0068c003/0dc9964505df43288febb6aac33ac6a0/?a=1988&br=472&bt=236&cr=0&cs=0&cv=1&dr=0&ds=3&er=&l=202010090756070101150790831801261E&lr=tiktok_m&mime_type=video_mp4&qs=0&rc=M3Vna3N1d3FrczMzOzczM0ApO2Q6NjZnOzs0N2k7aGhpaGcxaDM0ay1gMHBfLS0wMTZzc182MWI1YzEtYTY2LWNjXzU6Yw%3D%3D&vl=&vr=",
    //     "videoUrlNoWaterMark": "https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=v09044380000bpsh3nct0rnp7h6dkr40&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4",
    //     "videoMeta": {
    //     "width": 576,
    //     "height": 1024,
    //     "ratio": 16,
    //     "duration": 16
    //     },
    //     "covers": {
    //     "default": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/2bc9c980bea7409698bd0acf0206bb8f_1584992746?x-expires=1602248400&x-signature=3SD93cwsCa7XpLpTyH103I5N%2Fto%3D",
    //     "origin": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/d1b00294a06e488b851ad6553cad41a0_1584992746?x-expires=1602248400&x-signature=V1YD8yL4OoNHN649dxWKLB4TIiI%3D"
    //     },
    //     "diggCount": 302300,
    //     "shareCount": 2389,
    //     "playCount": 3800000,
    //     "commentCount": 17300,
    //     "downloaded": false,
    //     "mentions": [],
    //     "hashtags": [
    //     {
    //     "id": "609365",
    //     "name": "happyathome"
    //     }
    //     ]
    //     }
    return utils.retry(async () => { return await TikTokScraper.getVideoMeta(link) }, 5);
}

const getDownloadLink = async (link) => {
    const videoMeta = await info(link);
    return videoMeta.videoUrl;
}

module.exports = {
    info,
    getDownloadLink
}
