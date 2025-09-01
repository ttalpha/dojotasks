import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../generated";
import { meQuery } from "../schema/queries";
import { AppRoute } from "../utils/routes";
import { logoutMutation } from "../schema/mutations";
import { toast } from "../hooks/use-toast";

export default function HomePage() {
  const { data } = useQuery(graphql(meQuery));
  const [logout] = useMutation(graphql(logoutMutation));
  const client = useApolloClient();

  const onLogout = async () => {
    await logout();
    client.resetStore();
    toast({ variant: "success", title: "Log out successfully" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data ? (
        <div>
          <h1>Hi {data.me.name}</h1>
          <Button variant="outline" onClick={onLogout}>
            Log out
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link to={AppRoute.Login}>Login</Link>
        </Button>
      )}
    </main>
  );
}
