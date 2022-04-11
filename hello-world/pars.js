const axios = require("axios");

exports.checkResult = async function (event) {
    const data = {
        "channel": "C0360PS0Q07",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Натисніть на кнопку, щоб зробити замовлення"
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Меню"
                    },
                    "action_id": "menu_click",
                    "value": JSON.stringify({channel: "C0360PS0Q07", startOrderTime: "08:00", endOrderTime: '20:00'})
                }
            }
        ]
    }
    await axios.post('https://slack.com/api/chat.postMessage', data, {
        headers: {
            'Authorization': 'Bearer xoxb-11489995456-3216466945429-WM9u9sRwEcphjXYHse9yZNFc',
            'Content-Type': 'application/json',
            'X-Slack-No-Retry': 1
        }
    })
}