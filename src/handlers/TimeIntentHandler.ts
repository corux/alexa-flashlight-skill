import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { parse, toSeconds } from "iso8601-duration";

import { Constants } from "../utils/Constants";
import { Directives } from "../utils/Directives";
import { generateSilence } from "../utils/SilenceGenerator";

export class TimeIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "TimeIntent";
  }

  public handle(handlerInput: HandlerInput): Response {
    let seconds = Constants.DEFAULT_TIME;

    const timeSlot = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.time.value;
    if (timeSlot) {
      try {
        seconds = toSeconds(parse(timeSlot));
        seconds = Math.min(seconds, Constants.MAX_TIME);
      } catch {
        // ignore exception, e.g. from parsing invalid duration
      }
    }

    const responseBuilder = handlerInput.responseBuilder;
    const ssml = generateSilence(seconds);

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.currentInputHandlerId = handlerInput.requestEnvelope.request.requestId;
    sessionAttributes.stopAt = Date.now() + (seconds * 1000);

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
