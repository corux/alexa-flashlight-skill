import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { interfaces, Response } from "ask-sdk-model";
import { getNextColor } from "../utils/ColorCycle";
import { Constants } from "../utils/Constants";
import { Directives } from "../utils/Directives";

export class GameEngineInputHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "GameEngine.InputHandlerEvent";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.buttons = sessionAttributes.buttons || {};

    let response = responseBuilder;

    const request = handlerInput.requestEnvelope.request as interfaces.gameEngine.InputHandlerEventRequest;
    if (request && request.events && request.events[0].name === "button_down_event") {
      const gadgetId = request.events[0].inputEvents[0].gadgetId;
      sessionAttributes.buttons[gadgetId] = getNextColor(sessionAttributes.buttons[gadgetId]);
      sessionAttributes.stopAt = Math.max(Date.now() + Constants.INPUT_HANDLER_TIMEOUT, sessionAttributes.stopAt);
      response = response.addDirective(Directives.buildButton([gadgetId], sessionAttributes.buttons[gadgetId]));
    }

    if (Date.now() < sessionAttributes.stopAt) {
      response = response.addDirective(Directives.startInputHandler);
      sessionAttributes.currentInputHandlerId = handlerInput.requestEnvelope.request.requestId;
    } else {
      response = response
        .addDirective(Directives.buildStopInputHandler(sessionAttributes.currentInputHandlerId))
        .withShouldEndSession(true);
    }

    return response.getResponse();
  }
}
