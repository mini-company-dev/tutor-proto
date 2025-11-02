import { ConversationStatus } from "@/app/type/types";

interface Props {
  status: ConversationStatus;
  error?: string | null;
}

export const StatusIndicator = ({status, error}: Props) => {
    switch (status) {
      case ConversationStatus.CONNECTING:
        return <div className="text-yellow-400">Connecting to AI Tutor...</div>;
      case ConversationStatus.LISTENING:
        return (
          <div className="flex items-center text-green-400">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Listening...
          </div>
        );
      case ConversationStatus.PROCESSING_ASSESSMENT:
        return (
          <div className="text-cyan-400 animate-pulse">
            Generating your assessment...
          </div>
        );
      case ConversationStatus.ASSESSMENT_READY:
        return <div className="text-fuchsia-400">Assessment Complete!</div>;
      case ConversationStatus.ERROR:
        return <div className="text-red-500">Error: {error}</div>;
      default:
        return null;
    }
  };

