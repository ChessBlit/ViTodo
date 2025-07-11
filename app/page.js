import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      I am homepage
      <Link href={"/signup"}><Button className={"mx-2"}>Signup</Button></Link>
      <Link href={"/login"}><Button>Login</Button></Link>
    </main>
  );
}
