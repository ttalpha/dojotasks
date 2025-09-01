"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-login";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

export const LoginForm = () => {
  const { form, onSubmit, loading } = useLogin();
  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email</Label>
                <Input
                  isInvalid={form.getFieldState("email").invalid}
                  id="email"
                  disabled={loading}
                  {...field}
                  placeholder="m@example.com"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/404"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  isInvalid={form.getFieldState("password").invalid}
                  disabled={loading}
                  id="password"
                  {...field}
                  type="password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full gap-x-2">
            {loading && <Spinner />}
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
