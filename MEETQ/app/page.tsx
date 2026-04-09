import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Navbar */}
      <header className="bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center h-16 px-6 w-full max-w-full">
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-zinc-50">
            MeetQ
          </span>

        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            Real-time Queue Management
          </span>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-tight text-balance">
            Smart Schedule: <br/>
            <span className="text-primary">Faculty-Student Sync</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-pretty">
            A real-time office hours queue management system for universities. 
            Connect faculty and students seamlessly with AI-powered scheduling.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 justify-center pt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/faculty/login"
                className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95 transition-all"
              >
                Faculty Login
              </Link>
              <Link 
                href="/student/login"
                className="px-8 py-3 bg-secondary text-white rounded-full font-semibold shadow-lg shadow-secondary/20 hover:opacity-95 active:scale-95 transition-all"
              >
                Student Login
              </Link>
            </div>
            <div className="text-sm text-on-surface-variant">
              New to MeetQ?{' '}
              <Link href="/faculty/signup" className="text-primary hover:underline font-semibold">
                Faculty sign up
              </Link>
              {' '}or{' '}
              <Link href="/student/signup" className="text-primary hover:underline font-semibold">
                Student sign up
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 mb-12">
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary">schedule</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-on-surface-variant text-sm">
              Live queue positions, wait time estimates, and instant notifications.
            </p>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-secondary">psychology</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Clustering</h3>
            <p className="text-on-surface-variant text-sm">
              Intelligently group students with similar questions for efficient sessions.
            </p>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-tertiary">analytics</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-on-surface-variant text-sm">
              Peak demand heatmaps, session insights, and optimization recommendations.
            </p>
          </div>
        </div>
      </main>
      
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 w-150 h-150 bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-125 h-125 bg-secondary/5 blur-[120px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
    </div>
  )
}
