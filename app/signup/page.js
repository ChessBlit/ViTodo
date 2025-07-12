"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "../schemas/user.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfileForm = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(values) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(values);

        const requestOptions = {
            cache: 'no-store',
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",

        };

        try {
            const response = await fetch("/api/users/register", requestOptions);
            const data = await response.json()

            if (!(data.status === 200)) {
                if (Array.isArray(data.field)) {
                    data.field.map((field) => {
                        form.setError(field, {
                            type: "manual",
                            message: data.message,
                        });
                    });

                    return;
                }
                form.setError(data.field, {
                    type: "manual",
                    message: data.message,
                });

                return;
            }

            router.push("/login")


        } catch (error) {
            console.error(error);

        }
    }
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-gray-600 dark:text-gray-300">Join us today and get started</p>
                </div>

                <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-slate-700">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="JhonDoe" 
                                                {...field} 
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            This is your username.
                                        </FormDescription>
                                        <FormMessage className="text-xs text-red-600 dark:text-red-400 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="jhon@doe.com" 
                                                {...field} 
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            This your Email.
                                        </FormDescription>
                                        <FormMessage className="text-xs text-red-600 dark:text-red-400 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type={"password"} 
                                                {...field} 
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            This is your password.
                                        </FormDescription>
                                        <FormMessage className="text-xs text-red-600 dark:text-red-400 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                            >
                                Create Account
                            </Button>
                        </form>
                    </Form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfileForm;