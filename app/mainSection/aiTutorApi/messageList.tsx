import { BotIcon, UserIcon } from "../icons";

export const MessageList = ({
  transcripts,
  interimTranscript,
  transcriptEndRef,
}: any) => (
  <div className="space-y-6">
    {transcripts.map((entry: any, i: number) => (
      <div
        key={i}
        className={`flex items-start gap-3 ${
          entry.speaker === "user" ? "justify-end" : ""
        }`}
      >
        {entry.speaker === "ai" && (
          <BotIcon className="w-8 h-8 text-cyan-400 mt-1" />
        )}
        <div
          className={`px-4 py-3 rounded-xl max-w-lg ${
            entry.speaker === "user" ? "bg-fuchsia-600" : "bg-gray-700"
          }`}
        >
          <p className="text-white">{entry.text}</p>
        </div>
        {entry.speaker === "user" && (
          <UserIcon className="w-8 h-8 text-gray-400 mt-1" />
        )}
      </div>
    ))}

    {interimTranscript && (
      <div className="flex items-start gap-3 justify-end">
        <div className="px-4 py-3 rounded-xl max-w-lg bg-fuchsia-800 opacity-70">
          <p className="text-gray-300 italic">{interimTranscript}</p>
        </div>
        <UserIcon className="w-8 h-8 text-gray-400 mt-1" />
      </div>
    )}

    <div ref={transcriptEndRef} />
  </div>
);