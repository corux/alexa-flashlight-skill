import { HandlerInput, RequestInterceptor, ResponseInterceptor } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class LogInterceptor implements RequestInterceptor, ResponseInterceptor {
    public process(handlerInput: HandlerInput, response?: Response) {
        if (!!response) {
            console.log("Response: " + JSON.stringify(response));
        } else {
            console.log("Request: " + JSON.stringify(handlerInput.requestEnvelope));
        }
    }
}
