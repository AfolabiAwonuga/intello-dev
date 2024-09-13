import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import bg from "../public/landing.webp";
import { redirect } from "next/navigation";

import LandingMain from "@/components/LandingMain";
import { ThemeToggle } from "@/components/ThemeToggle";
import ToggleNav from "@/components/ToggleNav";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full h-screen flex flex-col relative">
      <ToggleNav />

      <div className="flex flex-col h-full items-center justify-center">
        <LandingMain />
        {session ? (
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        ) : (
          <div className="space-x-4">
            {/* <RegisterLink>
              <Button>Register</Button>
            </RegisterLink> */}
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          </div>
        )}
      </div>
    </div>
  );
}
