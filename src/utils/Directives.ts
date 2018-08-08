import { Directive, interfaces } from "ask-sdk-model";
import { Constants } from "./Constants";

export class Directives {

  public static readonly startInputHandler: interfaces.gameEngine.StartInputHandlerDirective = {
    events: {
      button_down_event: {
        meets: ["button_down_recognizer"],
        reports: "matches",
        shouldEndInputHandler: true,
      },
      timeout: {
        meets: ["timed out"],
        reports: "history",
        shouldEndInputHandler: true,
      },
    },
    recognizers: {
      button_down_recognizer: {
        anchor: "end",
        fuzzy: true,
        pattern: [{
          action: "down",
        }],
        type: "match",
      },
    },
    timeout: Constants.INPUT_HANDLER_TIMEOUT,
    type: "GameEngine.StartInputHandler",
  };

  public static readonly disableButtonDown: Directive = {
    parameters: {
      animations: [],
      triggerEvent: "buttonDown",
      triggerEventTimeMs: 0,
    },
    targetGadgets: [],
    type: "GadgetController.SetLight",
    version: 1,
  };

  public static readonly buildButton = (targetGadgets, color: string): Directive => {
    return {
      parameters: {
        animations: [{
          repeat: 10,
          sequence: [{
            blend: true,
            color,
            durationMs: 300,
          }, {
            blend: false,
            color,
            durationMs: 60000,
          }],
          targetLights: ["1"],
        }],
        triggerEvent: "none",
        triggerEventTimeMs: 0,
      },
      targetGadgets,
      type: "GadgetController.SetLight",
      version: 1,
    };
  }

  public static readonly buildStopInputHandler = (requestId): interfaces.gameEngine.StopInputHandlerDirective => {
    return {
      originatingRequestId: requestId,
      type: "GameEngine.StopInputHandler",
    };
  }
}
