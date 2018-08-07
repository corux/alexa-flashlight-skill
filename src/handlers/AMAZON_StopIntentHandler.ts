import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class AmazonStopIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "AMAZON.StopIntent";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .withShouldEndSession(true)
      .getResponse();
  }
}
