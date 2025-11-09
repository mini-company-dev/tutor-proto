import { ObjectiveTestResult } from "./objective-test/clientTestType";
import { TutorSpeakEvaluation } from "./speak-test/tutorSpeakTypes";

export interface CEvaluationMetrics
  extends TutorSpeakEvaluation,
    ObjectiveTestResult {}

interface CEvaluationMetricDetail {
  score: number;
  count: number;
  sentence: string[];
}

export type CEvaluationMetricsExtended = {
  [K in keyof CEvaluationMetrics]: CEvaluationMetricDetail;
};