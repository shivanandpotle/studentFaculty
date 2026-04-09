"use client"

import { useState } from "react"

interface JoinQueueModalProps {
  isOpen: boolean
  onClose: () => void
  faculty: {
    name: string
    department: string
    avatar: string
  }
  onSubmit?: (data: { reason: string; isUrgent: boolean }) => void
}

export function JoinQueueModal({ isOpen, onClose, faculty, onSubmit }: JoinQueueModalProps) {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  
  if (!isOpen) return null
  
  const handleSubmit = () => {
    onSubmit?.({ reason, isUrgent })
    onClose()
  }
  
  return (
    <div className="fixed inset-0 z-60 glass-blur bg-surface/80 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
        {/* Step Indicators */}
        <div className="flex gap-2 p-6 pb-0">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
        </div>
        
        {/* Modal Content */}
        <div className="p-8 pt-6">
          <header className="mb-8">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="mb-4 text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span className="text-sm font-medium">Back</span>
              </button>
            )}
            <h2 className="text-2xl font-bold tracking-tight">
              {step === 1 ? "Select Faculty" : step === 2 ? "Visit Details" : "Confirm"}
            </h2>
            <p className="text-on-surface-variant">
              {step === 1 
                ? "Choose who you'd like to meet with." 
                : step === 2 
                  ? `Tell ${faculty.name} what you'd like to discuss.`
                  : "Review and confirm your queue entry."
              }
            </p>
          </header>
          
          {step === 1 && (
            <div className="space-y-4">
              {/* Selected Faculty Preview */}
              <div 
                onClick={() => setStep(2)}
                className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl hover:ring-2 ring-primary/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      className="w-16 h-16 rounded-full border-2 border-secondary object-cover" 
                      src={faculty.avatar}
                      alt={faculty.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-surface flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{faculty.name}</h3>
                    <p className="text-on-surface-variant text-sm">{faculty.department}</p>
                  </div>
                </div>
                <span className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">AVAILABLE</span>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              {/* Text Area Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-outline">Reason for Visit</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 ring-primary/20 text-on-surface p-4 placeholder:text-outline/50" 
                  placeholder="Briefly describe your question or topic..."
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              
              {/* Toggle Section: Urgent Signature */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">ink_pen</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Urgent Signature</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Document handling required</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-12 h-6 rounded-full relative p-1 transition-colors ${isUrgent ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`absolute top-1 bottom-1 aspect-square bg-white rounded-full shadow-sm transition-all ${isUrgent ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              
              {/* Action Button */}
              <button 
                onClick={() => setStep(3)}
                disabled={!reason.trim()}
                className="w-full editorial-gradient text-on-primary py-5 rounded-xl font-semibold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-surface-container-low rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    className="w-12 h-12 rounded-full object-cover" 
                    src={faculty.avatar}
                    alt={faculty.name}
                  />
                  <div>
                    <h3 className="font-semibold">{faculty.name}</h3>
                    <p className="text-on-surface-variant text-sm">{faculty.department}</p>
                  </div>
                </div>
                <div className="border-t border-outline-variant/20 pt-4">
                  <p className="text-sm text-on-surface-variant mb-1">Reason for visit:</p>
                  <p className="font-medium">{reason}</p>
                </div>
                {isUrgent && (
                  <div className="flex items-center gap-2 text-error">
                    <span className="material-symbols-outlined text-sm">priority_high</span>
                    <span className="text-sm font-semibold">Marked as urgent</span>
                  </div>
                )}
              </div>
              
              {/* Action Button */}
              <button 
                onClick={handleSubmit}
                className="w-full editorial-gradient text-on-primary py-5 rounded-xl font-semibold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Join the Queue
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Modal Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  )
}
