import {SkillBuilders} from "ask-sdk-core";
import {LambdaHandler} from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";

import {AmazonCancelIntentHandler} from "./handlers/AMAZON_CancelIntentHandler";
import {AmazonHelpIntentHandler} from "./handlers/AMAZON_HelpIntentHandler";
import {AmazonStopIntentHandler} from "./handlers/AMAZON_StopIntentHandler";
import {CustomErrorHandler} from "./handlers/CustomErrorHandler";
import {LaunchRequestHandler} from "./handlers/LaunchRequestHandler";
import {SessionEndedHandler} from "./handlers/SessionEndedHandler";

function buildLambdaSkill(): LambdaHandler {
    return SkillBuilders.custom()
        .addRequestHandlers(
            new AmazonCancelIntentHandler(),
            new AmazonStopIntentHandler(),
            new AmazonHelpIntentHandler(),
            new LaunchRequestHandler(),
            new SessionEndedHandler(),
        )
        .addErrorHandlers(new CustomErrorHandler())
        .lambda();
}

// Lambda handler - entry point for skill
export const handler = buildLambdaSkill();
