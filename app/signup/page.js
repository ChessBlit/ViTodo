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
        <main className="py-20">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="JhonDoe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your username.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon@doe.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This your Email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type={"password"} {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    );
};


export default ProfileForm;