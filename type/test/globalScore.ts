import { ObjectiveTestResult } from "./objective-test/clientTestType";
import { TutorSpeakEvaluation } from "./speak-test/tutorSpeakTypes";

export interface EvaluationMetrics
  extends TutorSpeakEvaluation,
    ObjectiveTestResult {}

interface EvaluationMetricDetail {
  score: number;
  sentences: string[];
}

export type EvaluationMetricsExtended = {
  [K in keyof EvaluationMetrics]: EvaluationMetricDetail;
};
