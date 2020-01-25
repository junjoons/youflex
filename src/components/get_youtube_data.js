import { google } from "googleapis";

let service = google.youtube("v3");
service.videos.list(
  {
    key: "AIzaSyB1IbUaKMQHmhBjm-Nwo9kcGzRqyRZIhSU",
    part: "snippet.statistics",
    id: "t-0WD34AytM",
    fields:
      "item(snippet(title, description, channelId),statistics(viewCount, likeCount, commentCount))"
  },
  function(err, response) {
    if (err) {
      console.log("the API returned a error: " + err);
      return;
    }

    let video = response.data.items;
    if (video.length == 0) {
      console.log("검색된 동영상이 없습니당");
    } else {
      console.log(JSON.stringify(response.data.items[0], null, 4));
    }
  }
);
