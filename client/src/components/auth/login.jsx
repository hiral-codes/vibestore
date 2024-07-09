import { useState } from "react";
import { NavLink } from "react-router-dom";
import ForgetPassword from "./forget-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [isForgetPassword, setisForgetPassword] = useState(false);
  return (
    <div className="relative w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  onClick={() => setisForgetPassword(true)}
                  variant="link"
                  className="text-xs"
                >
                  Forgot your password?
                </Button>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <NavLink to="/auth/signup" className="underline">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/blacksale.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-contain dark:brightness-[0.5] dark:grayscale"
        />
      </div>
      {isForgetPassword && (
        <ForgetPassword onClose={() => setisForgetPassword(false)} />
      )}
    </div>
  );
}
