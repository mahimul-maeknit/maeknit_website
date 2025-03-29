"use client"

// Option 1: Paper Airplane Icon
const PaperAirplaneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)



const ChatTrigger = ({ onClick }) => {
  // Change to the icon you prefer: PaperAirplaneIcon, LightningIcon, SparkleIcon, WaveIcon, or AbstractIcon
  const IconComponent = PaperAirplaneIcon // Currently using the Sparkle icon

  return (
    <button className="chat-trigger" onClick={onClick} aria-label="Open chat">
      <IconComponent />
    </button>
  )
}
export default ChatTrigger

