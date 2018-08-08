import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { Directives } from "../utils/Directives";

export class AmazonCancelAndStopIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.CancelIntent" || request.intent.name === "AMAZON.StopIntent");
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let response = responseBuilder.withShouldEndSession(true);
    if (!!sessionAttributes.currentInputHandlerId) {
      response = response.addDirective(Directives.buildStopInputHandler(sessionAttributes.currentInputHandlerId));
    }
    return response.getResponse();
  }
}
