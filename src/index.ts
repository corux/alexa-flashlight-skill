import { SkillBuilders } from "ask-sdk-core";

import { AmazonCancelAndStopIntentHandler } from "./handlers/AMAZON_CancelAndStopIntentHandler";
import { AmazonHelpIntentHandler } from "./handlers/AMAZON_HelpIntentHandler";
import { CustomErrorHandler } from "./handlers/CustomErrorHandler";
import { GameEngineInputHandler } from "./handlers/GameEngine_InputHandler";
import { LaunchRequestHandler } from "./handlers/LaunchRequestHandler";
import { SessionEndedHandler } from "./handlers/SessionEndedHandler";
import { TimeIntentHandler } from "./handlers/TimeIntentHandler";
import { LogInterceptor } from "./interceptors/LogInterceptor";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        new AmazonCancelAndStopIntentHandler(),
        new AmazonHelpIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
        new TimeIntentHandler(),
        new GameEngineInputHandler(),
    )
    .addErrorHandlers(
        new CustomErrorHandler(),
    )
    .addRequestInterceptors(
        new LogInterceptor(),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .lambda();
