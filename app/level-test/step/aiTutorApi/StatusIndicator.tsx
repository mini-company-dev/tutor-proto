import { CConversationStatus } from "@/type/test/speak-test/clientAiType";

interface Props {
  status: CConversationStatus;
  error?: string | null;
}

export const StatusIndicator = ({ status, error }: Props) => {
  switch (status) {
    case CConversationStatus.CONNECTING:
      return (
        <div className="flex items-center text-[#eab308]">
          <div className="w-2.5 h-2.5 bg-[#eab308] rounded-full mr-2 animate-ping"></div>
          AI 튜터에 연결 중이에요. 잠시만 기다려주세요
        </div>
      );

    case CConversationStatus.LISTENING:
      return (
        <div className="flex items-center text-[#16a34a]">
          <div className="w-2.5 h-2.5 bg-[#16a34a] rounded-full mr-2 animate-pulse"></div>
          AI가 사용자의 음성을 듣는 중이에요
        </div>
      );

    case CConversationStatus.PROCESSING_ASSESSMENT:
      return (
        <div className="flex items-center text-[#0891b2] animate-pulse">
          <div className="w-2.5 h-2.5 bg-[#06b6d4] rounded-full mr-2 animate-bounce"></div>
          AI가 발음과 유창성을 평가하고 있어요
        </div>
      );

    case CConversationStatus.ASSESSMENT_READY:
      return (
        <div className="flex items-center text-[#a21caf]">
          <div className="w-2.5 h-2.5 bg-[#a21caf] rounded-full mr-2"></div>
          분석이 완료되었어요! 결과를 확인해볼까요?
        </div>
      );

    case CConversationStatus.ERROR:
      return (
        <div className="flex items-center text-[#dc2626]">
          <div className="w-2.5 h-2.5 bg-[#dc2626] rounded-full mr-2"></div>
          오류가 발생했어요 {error ? `(${error})` : ""}
        </div>
      );

    case CConversationStatus.IDLE:
    default:
      return (
        <div className="flex items-center text-gray-600">
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
          준비 완료! “시작” 버튼을 눌러 대화를 시작하세요.
        </div>
      );
  }
};
