import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";

export class AmazonHelpIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "AMAZON.HelpIntent";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;

    let helpText;
    const request = handlerInput.requestEnvelope.request as IntentRequest;
    if (request.locale.match(/^de-/)) {
      helpText = `Dieser Skill lässt den Echo Licht Ring und die Echo Buttons leuchten.
        Für weitere Informationen siehe im Skill Store nach.`;
    } else {
      helpText = `This Skill lets the Echo light ring and the Echo Buttons glow.
        Further information can be found in the Skill Store.`;
    }

    return responseBuilder
      .speak(helpText)
      .withShouldEndSession(true)
      .getResponse();
  }
}
