"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        },
    });

    async function onSubmit(values) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(values);

        const requestOptions = {
            cache: "no-store",
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("http://localhost:3000/api/users/login", requestOptions);
            const data = await response.json();

            if (data.status !== 200) {
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

            router.push("/todos")



        } catch (error) {
            console.error(error);
        };
    }

    return (
        <main>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="usernameOrEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username Or Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="JhonDoe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your Username or Email
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="JhonDoe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter yout password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    )
}

export default page