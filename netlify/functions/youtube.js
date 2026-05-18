const axios = require('axios');

exports.handler = async function (event, context) {
    // ඔබගේ රහසිගත API Key එක සහ YouTube Channel ID එක මෙහි ඇත (Frontend එකට නොපෙනේ)
    const API_KEY = "AIzaSyD4Z1efQObQDb3cVGNcWNtLzxJ8kOT-j1Y"; 
    const CHANNEL_ID = "UCG4T-g42X6Hq4XzDRE8Qz_Q"; // @SithuBeastLk වෙනුවෙන් අදාළ නිවැරදි Channel ID එක

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const stats = response.data.items[0].statistics;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                viewCount: stats.viewCount,
                videoCount: stats.videoCount
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch YouTube data" })
        };
    }
};