import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="card bg-white shadow-xl w-80 h-96 flex flex-col overflow-hidden mb-3">
          <div className="px-4 py-2 border-b flex items-center justify-between">
            <div className="font-semibold">Live Chat</div>
            <button className="btn btn-ghost btn-xs" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-auto text-sm">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">Hi! How can we help you today?</div>
            </div>
          </div>
          <div className="p-3 flex gap-2">
            <input className="input input-bordered input-sm flex-1" placeholder="Type your question..." />
            <button className="btn btn-primary btn-sm">Send</button>
          </div>
        </div>
      )}
      <button className="btn btn-primary btn-circle shadow-lg" onClick={() => setOpen(v => !v)}>
        {open ? '−' : '?'}
      </button>
    </div>
  )
}