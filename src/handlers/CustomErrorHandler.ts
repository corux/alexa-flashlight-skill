import {ErrorHandler, HandlerInput} from "ask-sdk-core";
import {Response} from "ask-sdk-model";

export class CustomErrorHandler implements ErrorHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    return true;
  }

  public handle(handlerInput: HandlerInput, error: Error): Response {
    const request = handlerInput.requestEnvelope.request;

    console.log(`Error handled: ${error.message}`);
    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

    return handlerInput.responseBuilder
        .speak("Sorry, I can not understand the command.  Please say again.")
        .reprompt("Sorry, I can not understand the command.  Please say again.")
        .getResponse();
  }
}
