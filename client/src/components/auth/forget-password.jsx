import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

function ForgetPassword({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recover Password</CardTitle>
          <CardDescription>
            Enter your email to recover your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Remember Password?{" "}
            <Button onClick={onClose} variant="link">
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgetPassword;
