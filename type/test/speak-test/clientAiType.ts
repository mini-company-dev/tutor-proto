import { ObjectiveTestResult } from "../objective-test/clientTestType";
import { TutorSpeakEvaluation } from "./tutorSpeakTypes";

export enum CConversationStatus {
  IDLE,
  CONNECTING,
  LISTENING,
  PROCESSING_ASSESSMENT,
  ASSESSMENT_READY,
  ERROR,
}

export interface CEvaluationMetrics
  extends TutorSpeakEvaluation,
    ObjectiveTestResult {}
