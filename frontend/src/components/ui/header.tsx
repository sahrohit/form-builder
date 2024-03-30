import React from "react";
import { Button } from "./button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        cookies().delete("session-token");
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

function Login() {
  return (
    <form
      action={async () => {
        "use server";

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "sahrohit9586@gmail.com",
              password: "alphabet26",
            }),
            cache: "no-store",
          }
        ).then((res) => res.json());

        if (res.token) {
          cookies().delete("session-token");
          cookies().set("session-token", res.token);
        }
      }}
    >
      <Button type="submit">Login</Button>
    </form>
  );
}

const Header = async (props: Props) => {
  const session = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("session-token")?.value ?? ""}`,
    },
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <header className="border bottom-1">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <h1>AI Form Builder</h1>
          <div>
            {session?.user?.id ? (
              <div className="flex items-center gap-4">
                <Link href="/view-forms">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                {session.user?.name && session.user?.image && (
                  <Image
                    src={session.user?.image}
                    alt={session.user?.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <SignOut />
              </div>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
