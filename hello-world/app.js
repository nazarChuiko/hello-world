// // const axios = require('axios')
// // const url = 'http://checkip.amazonaws.com/';
// let response;
//
// /**
//  *
//  * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
//  * @param {Object} event - API Gateway Lambda Proxy Input Format
//  *
//  * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
//  * @param {Object} context
//  *
//  * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
//  * @returns {Object} object - API Gateway Lambda Proxy Output Format
//  *
//  */
// exports.lambdaHandler = async (event, context) => {
//     try {
//         // const ret = await axios(url);
//         response = {
//             'statusCode': 200,
//             'body': JSON.stringify({
//                 message: 'hello world!',
//                 // location: ret.data.trim()
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
//
//     return response
// };

const { App, AwsLambdaReceiver} = require('@slack/bolt');

// const app = new App({
//     token: 'xoxb-3025353563158-3017496563927-Ik9BPoOxq1xjzhPolwHC3jEP',
//     signingSecret: '193e3546c4731fb9fcc4bf824faedca1',
//     socketMode: true,
//     appToken: 'xapp-1-A031MPMDRT2-3029349727814-57370c15721a29397499b111119627a827c673836ca78e80289ac0ebf8c9b619',
//     // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
//     // you still need to listen on some port!
//     port: process.env.PORT || 3000
// });

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: '193e3546c4731fb9fcc4bf824faedca1',
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
    token: 'xoxb-3025353563158-3017496563927-Ik9BPoOxq1xjzhPolwHC3jEP',
    receiver: awsLambdaReceiver,

    // When using the AwsLambdaReceiver, processBeforeResponse can be omitted.
    // If you use other Receivers, such as ExpressReceiver for OAuth flow support
    // then processBeforeResponse: true is required. This option will defer sending back
    // the acknowledgement until after your handler has run to ensure your function
    // isn't terminated early by responding to the HTTP request that triggered it.

    // processBeforeResponse: true
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey there <@${message.user}>!`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
});

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

exports.handler = async (event, context, callback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
}