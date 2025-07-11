"use client";
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TodoSchema } from '../schemas/todo.schema';

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [disabled, setDisabled] = useState(false)
    const form = useForm({
        resolver: zodResolver(TodoSchema),
        defaultValues:{
            content: ""
        }
    });
    const fetchTodos = async () => {

        const requestOptions = {
            cache: 'no-store',
            method: "POST",
            redirect: "follow"
        };

        try {
            const response = await fetch("/api/todos/getAll", requestOptions);
            const result = await response.json();
            setTodos(result.todos)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchTodos()

    }, [])

    const handleCheckChange = async (id, isCompleted) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "isCompleted": isCompleted
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            setDisabled(true)
            await fetch("api/todos/toggleComplete/" + id, requestOptions);
            fetchTodos()

        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setDisabled(false)

            }, 500);
        }
    }

    async function onSubmit(values) {
        console.log(values);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(values);

        const requestOptions = {
            cache: 'no-store',
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("api/todos/create", requestOptions);
            const result = await response.text();
            fetchTodos()
        } catch (error) {
            console.error(error);
        };
    }


    return (
        <main>
            <div className='flex justify-end'>
                <Form {...form} className="flex justify-around">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex gap-5 justify-center w-full">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Buy Grocery" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='dark:invert-0'>Add</Button>
                    </form>
                </Form>
            </div>
            {todos && todos.map((todo) => (
                <div key={todo._id} className='flex items-center gap-2 justify-center rounded-sm p-2 bg-slate-500'>
                    <Checkbox disabled={disabled} checked={todo.isCompleted} onCheckedChange={() => { handleCheckChange(todo._id, !todo.isCompleted) }} />
                    <span className="content">{todo.content}</span>
                </div>
            ))}
        </main>
    )
}

export default Todos