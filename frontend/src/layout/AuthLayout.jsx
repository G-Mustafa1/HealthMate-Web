import React from 'react'
import { FileText, Heart, TrendingUp, Sparkles } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const features = [
    {
      icon: <FileText className="w-4 h-4" />,
      title: 'Reports Upload karein',
      desc: 'Medical reports securely store karein AI analysis ke saath.',
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: 'AI Health Analysis',
      desc: 'Fori health summary English aur Roman Urdu mein.',
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Progress Track karein',
      desc: 'Vitals monitor karein aur medical timeline dekhein.',
    },
  ]

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        .auth-logo-float  { animation: floatY 5s ease-in-out infinite; }
        .auth-left-panel  { animation: fadeUp 0.7s ease both; }
        .auth-right-panel { animation: fadeUp 0.7s ease 0.15s both; }
        .auth-feat-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .auth-feat-2 { animation: fadeUp 0.6s ease 0.2s both; }
        .auth-feat-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .auth-grad-text {
          background: linear-gradient(135deg, hsl(168,70%,38%), hsl(200,75%,45%));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .auth-feature-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 16px hsla(168,70%,38%,0.1) !important;
        }
      `}</style>

      <div className="page-gradient min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute pointer-events-none" style={{
          top: '-100px', left: '-100px', width: '520px', height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(168,70%,60%,0.16) 0%, transparent 65%)',
          animation: 'orbFloat 12s ease-in-out infinite',
        }} />
        <div className="absolute pointer-events-none" style={{
          bottom: '-140px', right: '-80px', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(200,75%,60%,0.11) 0%, transparent 65%)',
          animation: 'orbFloat 16s ease-in-out infinite reverse',
        }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, hsla(168,70%,38%,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-16 items-center relative z-10">

          <div className="hidden md:flex flex-col gap-7 auth-left-panel">

            {/* Brand */}
            <div className="flex items-center gap-3.5">
              <div className="auth-logo-float w-14 h-14 rounded-[15px] flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(168,70%,38%), hsl(200,75%,45%))',
                  boxShadow: '0 8px 24px hsla(168,70%,38%,0.3)',
                }}>
                <Heart className="w-6 h-6 text-white" fill="rgba(255,255,255,0.35)" />
              </div>
              <div>
                <h1 className="text-[28px] font-extrabold tracking-tight text-foreground">HealthMate</h1>
                <p className="text-[13px] font-medium mt-0.5" style={{ color: 'hsl(168,60%,40%)' }}>
                  Sehat ka Smart Dost
                </p>
              </div>
            </div>

            {/* Headline */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full mb-3"
                style={{
                  background: 'hsla(168,70%,38%,0.09)',
                  color: 'hsl(168,70%,30%)',
                  border: '1px solid hsla(168,70%,38%,0.18)',
                  letterSpacing: '0.3px',
                }}>
                <Sparkles className="w-3 h-3" /> AI-Powered Health
              </div>

              <h2 className="text-[38px] font-extrabold leading-[1.18] tracking-tight text-foreground mb-3">
                Apni Sehat,<br />
                <span className="auth-grad-text">Apne Haath Mein</span>
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Medical reports upload karein, AI se analysis hasil karein, aur apni health journey track karein — sab ek jagah.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2.5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`auth-feature-card auth-feat-${i + 1} flex gap-3.5 items-start p-3.5 rounded-[13px] transition-all duration-200`}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsla(168,70%,38%,0.1), hsla(200,75%,45%,0.07))',
                      border: '1px solid hsla(168,70%,38%,0.14)',
                      color: 'hsl(168,70%,36%)',
                    }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-bold text-foreground mb-0.5">{f.title}</h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>            
          </div>

          <div className="auth-right-panel">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout