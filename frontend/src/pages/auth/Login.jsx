import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/feature/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { user, loading, error } = useSelector(state => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (user) {
            toast.success("Login successful!")
            navigate("/home")
        }
        if (error) {
            toast.error("Failed to login")
        }
    }, [user, error, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email.trim()) return toast.error("Email is required")
        if (!password.trim() || password.length < 8)
            return toast.error("Password must be at least 8 characters")

        dispatch(login({ email, password }))
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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="register-input h-11 rounded-[10px] text-sm"
                            style={{
                                background: 'hsl(160,20%,96%)',
                                border: '1.5px solid hsl(160,15%,87%)',
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
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                className="register-input h-11 rounded-[10px] text-sm pr-11"
                                style={{
                                    background: 'hsl(160,20%,96%)',
                                    border: '1.5px solid hsl(160,15%,87%)',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-[11px] font-bold text-sm flex items-center justify-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, hsl(168,70%,38%), hsl(200,75%,45%))',
                            color: '#fff',
                        }}
                    >
                        {loading ? "Logging..." : (
                            <>
                                <span>Log In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[11px] text-muted-foreground">Or continue with?</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <Link to="/register">
                    <Button
                        variant="outline"
                        className="w-full h-11 rounded-[11px]"
                    >
                        Create an account
                    </Button>
                </Link>

            </CardContent>
        </Card>
    )
}

export default Login