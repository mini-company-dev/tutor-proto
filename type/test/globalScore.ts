import { ObjectiveTestResult } from "./objective-test/clientTestType";
import { TutorSpeakEvaluation } from "./speak-test/tutorSpeakTypes";

export interface CEvaluationMetrics
  extends TutorSpeakEvaluation,
    ObjectiveTestResult {}
