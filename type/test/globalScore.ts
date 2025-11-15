import { ObjectiveTestResult } from "./objective-test/clientTestType";
import { TutorSpeakEvaluation } from "./speak-test/tutorSpeakTypes";

export interface EvaluationMetrics
  extends TutorSpeakEvaluation,
    ObjectiveTestResult {}

interface EvaluationMetricDetail {
  score: number;
  count: number;
  sentence: string[];
}

export type EvaluationMetricsExtended = {
  [K in keyof EvaluationMetrics]: EvaluationMetricDetail;
};
