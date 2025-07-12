"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
const Navbar = () => {
    const { setTheme } = useTheme();
    const [loggedIn, setLoggedIn] = useState(false)

    async function getLoginState() {
        const myHeaders = new Headers();

        const requestOptions = {
            cache:"no-store",
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch("/api/users/state", requestOptions);
            const result = await response.json();
            setLoggedIn(result.loggedIn)
            return result.loggedIn

        } catch (error) {
            console.error(error);
        };
    }

    useEffect(() => {
      getLoginState()
    
    }, [])
    

    return <nav className="flex z-50 fixed gap-2 justify-around py-4 items-center w-full backdrop-blur-sm dark:bg-black/10 bg-white/30">
        <Link href={"/home"}><div className="logo font-bold text-2xl dark:text-white text-white">ViTodo</div></Link>
        <div className="flex gap-2">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {loggedIn ? (

                <NavigationMenu>
                    <NavigationMenuList >
                        <NavigationMenuItem >
                            <NavigationMenuTrigger className={"bg-transparent hover:bg-transparent"}>
                                <Avatar>
                                    <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yelVoMWtheWM3Tmc5TEZlUzZIUWxaNGdKMXQiLCJyaWQiOiJ1c2VyXzJ6VW05VFkwOTIwOXVQWGdJSHhpZVYyMnlocSIsImluaXRpYWxzIjoiVlQifQ?width=160" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className={"w-20 flex z-50"} onClick={async () => {
                                    await fetch("/api/users/logout", {
                                        method: "POST"
                                    });
                                    getLoginState()
                                    window.location.reload()
                                }}>log Out</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>) : (
                <div className="flex gap-2">
                    <Link href={"/login"}>
                        <Button variant={"outline"}>Login</Button>
                    </Link>
                    <Link href={"/signup"}>
                        <Button>Signup</Button>
                    </Link>

                </div>
            )
            }

        </div>
    </nav>
};

export default Navbar;
