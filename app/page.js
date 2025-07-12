import connectDB from "@/components/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "./models/User.model";

export default async function Page() {
  await connectDB();
  const cookieMonster = await cookies()
  const refreshToken = cookieMonster.get('refreshToken')?.value

  if (!refreshToken) {
    redirect("/home")
  }

  const user = await User.findOne({
    refreshToken
  })

  if (!user) {
    redirect("/home")
  }

  redirect("/todos")

}
