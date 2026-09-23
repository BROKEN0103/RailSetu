import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-surface">
        <CardHeader className="flex flex-col items-center space-y-2 pb-6">
          <Logo size="md" className="mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground text-center">
            Enter your email address and we'll send you a reset link.
          </p>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-6">
              <Alert variant="success">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
              </Alert>
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send Reset Link
              </Button>
              
              <div className="mt-6 flex items-center justify-center">
                <Link to="/login" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
