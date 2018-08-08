import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { Constants } from "../utils/Constants";
import { Directives } from "../utils/Directives";
import { generateSilence } from "../utils/SilenceGenerator";

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const ssml = generateSilence(Constants.DEFAULT_TIME);

    sessionAttributes.currentInputHandlerId = handlerInput.requestEnvelope.request.requestId;
    sessionAttributes.stopAt = Date.now() + (Constants.DEFAULT_TIME * 1000);

    let response = responseBuilder;
    if (sessionAttributes.buttons) {
      sessionAttributes.buttons.keys().forEach((key) => {
        response = response.addDirective(Directives.buildButton([key], sessionAttributes.buttons[key]));
      });
    }

    return response
      .speak(ssml)
      .addDirective(Directives.startInputHandler)
      .addDirective(Directives.disableButtonDown)
      .getResponse();
  }
}
