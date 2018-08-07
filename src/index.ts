import { SkillBuilders } from "ask-sdk-core";

import { AmazonCancelIntentHandler } from "./handlers/AMAZON_CancelIntentHandler";
import { AmazonHelpIntentHandler } from "./handlers/AMAZON_HelpIntentHandler";
import { AmazonStopIntentHandler } from "./handlers/AMAZON_StopIntentHandler";
import { CustomErrorHandler } from "./handlers/CustomErrorHandler";
import { LaunchRequestHandler } from "./handlers/LaunchRequestHandler";
import { SessionEndedHandler } from "./handlers/SessionEndedHandler";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        new AmazonCancelIntentHandler(),
        new AmazonStopIntentHandler(),
        new AmazonHelpIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
    )
    .addErrorHandlers(
        new CustomErrorHandler(),
    )
    .lambda();
