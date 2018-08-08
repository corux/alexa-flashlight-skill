import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { Constants } from "../utils/Constants";
import { generateSilence } from "../utils/SilenceGenerator";

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;
    const ssml = generateSilence(Constants.DEFAULT_TIME);

    return responseBuilder
      .speak(ssml)
      .getResponse();
  }
}
