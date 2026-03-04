import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '@/feature/authSlice'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { user, loading, error } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            toast.success('Login successful')
            navigate('/home')
        };
        if (error) setError(error || 'Something went wrong');
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email.trim() || !password.trim()) {
            setError('All fields are required')
            return
        }
        dispatch(login({email, password}))
    }


    return (
        <Card className="w-full max-w-md mx-auto border-0 overflow-hidden"
            style={{
                background: '#f9fbfb',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.75)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px hsla(168,70%,38%,0.13)',
            }}>

            <CardHeader className="pb-2 pt-8 px-8">
                <CardTitle className="text-2xl font-extrabold">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Sign in to your health vault
                </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold tracking-wide"
                            style={{ color: 'hsl(200,30%,22%)' }}>
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="register-input h-11 rounded-[10px] text-sm transition-all duration-200"
                            style={{
                                background: 'hsl(160,20%,96%)',
                                border: '1.5px solid hsl(160,15%,87%)',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-xs font-bold tracking-wide"
                            style={{ color: 'hsl(200,30%,22%)' }}>
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                className="register-input h-11 rounded-[10px] text-sm pr-11 transition-all duration-200"
                                style={{
                                    background: 'hsl(160,20%,96%)',
                                    border: '1.5px solid hsl(160,15%,87%)',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center p-1 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>


                    </div>

                    {/* Error */}
                    {errorMsg && (
                        <div className="flex items-center gap-2 rounded-[9px] px-3 py-2.5 text-sm"
                            style={{
                                background: 'hsl(0,100%,97.5%)',
                                border: '1px solid hsl(0,80%,90%)',
                                color: 'hsl(0,72%,45%)',
                            }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                            {errorMsg}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="register-submit w-full h-11 rounded-[11px] font-bold text-sm flex items-center justify-center gap-2 mt-2 border-0"
                        style={{
                            background: 'linear-gradient(135deg, hsl(168,70%,38%), hsl(200,75%,45%))',
                            color: '#fff',
                            boxShadow: '0 4px 16px hsla(168,70%,38%,0.32)',
                            transition: 'all 0.2s ease',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <span>Login...</span>
                            </>
                        ) : (
                            <>
                                <span>Log In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[11px] text-muted-foreground">Or continue with?</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                {/* Login link */}
                <Link to="/register">
                    <Button
                        variant="outline"
                        className="w-full h-11 rounded-[11px] font-semibold text-sm bg-transparent hover:bg-[hsl(168,70%,96%)] hover:border-[hsl(168,70%,55%)] hover:text-[hsl(168,70%,30%)] transition-all duration-200"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Create an account
                    </Button>
                </Link>

            </CardContent>
        </Card>
    )
}

export default Register