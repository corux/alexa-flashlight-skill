import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class CustomErrorHandler implements ErrorHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    return true;
  }

  public handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);

    return handlerInput.responseBuilder
      .withShouldEndSession(true)
      .getResponse();
  }
}
