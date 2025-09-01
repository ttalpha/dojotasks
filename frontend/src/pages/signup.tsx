import { RegisterForm } from "@/components/auth/register-form";
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

export default function SignupPage() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="text-center text-sm w-full">
          Already have an account?{" "}
          <Button className="w-fit h-fit p-0 ml-1" variant="link" asChild>
            <Link to={AppRoute.Login}>Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
