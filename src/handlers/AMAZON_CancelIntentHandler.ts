import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class AmazonCancelIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "AMAZON.CancelIntent";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .withShouldEndSession(true)
      .getResponse();
  }
}
