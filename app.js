const Twitter = require('twitter-v2');
const express = require('express');

const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())

app.get("/", (req, res) => {
    res.send("ok")
})

app.get('/user',async (req, res) => {
    const query = (req.query);
    if(query.username){
        const response = await client.get(
            'users/by/username/'+query.username,
            {"user.fields": "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"}
        );
        
        res.json(response);
    }
})

app.get('/timeline', async (req, res) => {
    const query = (req.query);
    if(query.id){
        const response = await client.get(
            `users/${query.id}/tweets`,
            {"max_results":100,"end_time": query.end_time, "expansions":"author_id,referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,attachments.poll_ids,attachments.media_keys,in_reply_to_user_id,geo.place_id","user.fields":"name","start_time":query.start_time}
        );
        
        res.json(response);
    }
})

app.get("/tweet", async (req, res) =>{
    const query = (req.query);
    if(query.id){
        const response = await client.get(
            `tweets/${query.id}`,
        );
        res.json(response);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const client = new Twitter({
  consumer_key: 'RSbOJVhmktuu9A4ogHOppz5VD',
  consumer_secret: 'ZKFywpp1RTBnZEOAbcmcvmSPxJIWdP8rkDhYqNnUTffi6jvPFf',
  bearer_token: "AAAAAAAAAAAAAAAAAAAAAFkyTQEAAAAAmt%2FAjRYTSlRZStyNqeLm42MNBzA%3DUzfSI1YhrYu0Xr4CEzrhuG0zpoa0hGMwBZH1aj768gg8jUap6o"
});


// main(); 
// async function main() {
  
//     // Recent Tweet Search API Reference: https://bit.ly/3jqFjKF
//     const response = await client.get(
//       'users/by/username/4Azgin',
//       {"user.fields": "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"}
//     );
  
//     console.log(response);
// }