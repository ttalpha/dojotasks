import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AppRoute } from "@/utils/routes";

export default function LoginPage() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-center text-sm w-full">
          Don&apos;t have an account?{" "}
          <Button className="w-fit h-fit p-0 ml-1" variant="link" asChild>
            <Link to={AppRoute.Signup}>Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
