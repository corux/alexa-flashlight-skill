import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest";
  }

  public handle(handlerInput: HandlerInput): Response {
    const responseBuilder = handlerInput.responseBuilder;

    const timeInSeconds = 300;
    const ssml = this.getSilenceSsml(timeInSeconds);

    return responseBuilder
      .speak(ssml)
      .getResponse();
  }

  private getSilenceSsml(seconds: number) {
    const secondsPerBreak = 10;
    const ssml = `<prosody volume="x-loud">`
      + this.repeat(`<break time="${secondsPerBreak}s"/>`, Math.ceil(seconds / secondsPerBreak))
      + "</prosody>";

    return ssml;
  }

  private repeat(text: string, count: number) {
    let result = "";
    for (let i = 0; i < count; i++) {
      result += text;
    }

    return result;
  }
}
