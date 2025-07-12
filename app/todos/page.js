"use client";
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TodoSchema } from '../schemas/todo.schema';
import { Trash } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlusCircle } from 'lucide-react';

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [open, setOpen] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showFinished, setShowFinished] = useState(false)
    const form = useForm({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
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
            setOpen(true)
            const response = await fetch("api/todos/create", requestOptions);
            const data = await response.json();
            console.log(data.status);
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
            setOpen(false)
            fetchTodos()
        } catch (error) {
            console.error(error);
        } finally {
            fetchTodos()
        }
    }
    async function handleDelete(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        try {
            setDisabled(true)
            await fetch("api/todos/delete/" + id, requestOptions);
            fetchTodos()

        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setDisabled(false)

            }, 300);
        };
    }


    return (
        <main className='bg-gradient-to-br py-12 from-indigo-900 via-indigo-900 to-pink-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 min-h-screen'>
            {/* Header Section */}
            <div className='px-6 py-8'>
                <div className='max-w-4xl mx-auto'>
                    <div className='flex items-center justify-between mb-8'>
                        <div>
                            <h1 className='text-4xl font-bold text-white dark:text-gray-100 mb-2'>My Tasks</h1>
                            <p className='text-purple-200 dark:text-gray-300'>Stay organized and get things done</p>
                        </div>
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    className='bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-lg transition-all duration-200 shadow-lg hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:border-gray-600/30'
                                    size="lg"
                                >
                                    <PlusCircle className='mr-2 h-5 w-5' />
                                    Add Task
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-white/95 backdrop-blur-xl border-white/20 dark:bg-gray-800/95 dark:border-gray-600/30'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-gray-800 dark:text-gray-100'>Add a New Task</AlertDialogTitle>
                                </AlertDialogHeader>
                                <Form {...form}>
                                    <div onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-center">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="What needs to be done?" 
                                                            className="w-full bg-white/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700/80 dark:border-gray-600 dark:focus:border-purple-400 dark:text-white dark:placeholder-gray-400" 
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'>Cancel</AlertDialogCancel>
                                            <Button onClick={form.handleSubmit(onSubmit)}>Add Task</Button>
                                        </AlertDialogFooter>
                                    </div>
                                </Form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>

            {/* Todo List Section */}
            <div className="todos max-w-4xl mx-auto px-6 pb-8">
                <div className='bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden dark:bg-gray-800/20 dark:border-gray-600/30'>
                    {todos && todos.length > 0 ? (
                        <div className='divide-y divide-white/10 dark:divide-gray-600/20'>
                            {todos.map(todo => (
                                <div
                                    key={todo._id} 
                                    className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-white/5 dark:hover:bg-gray-700/20 ${
                                        todo.isCompleted ? 'opacity-60' : ''
                                    }`}
                                >
                                    <Checkbox 
                                        disabled={disabled} 
                                        checked={todo.isCompleted} 
                                        onCheckedChange={() => { handleCheckChange(todo._id, !todo.isCompleted) }}
                                        className='data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 dark:border-gray-500 dark:data-[state=checked]:bg-green-600 dark:data-[state=checked]:border-green-600'
                                    />
                                    
                                    <span 
                                        className={`flex-1 text-white transition-all duration-200 dark:text-gray-200 ${
                                            todo.isCompleted 
                                                ? 'line-through text-white/50 dark:text-gray-400' 
                                                : 'text-white dark:text-gray-200'
                                        }`}
                                    >
                                        {todo.content}
                                    </span>
                                    
                                    <Button 
                                        onClick={() => handleDelete(todo._id)} 
                                        disabled={disabled} 
                                        variant="ghost"
                                        size="sm"
                                        className='text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/20'
                                    >
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='px-6 py-12 text-center'>
                            <div className='text-white/60 dark:text-gray-400 text-lg mb-2'>No tasks yet</div>
                            <p className='text-white/40 dark:text-gray-500'>Add your first task to get started!</p>
                        </div>
                    )}
                </div>
                
                {/* Stats Section */}
                {todos && todos.length > 0 && (
                    <div className='mt-6 flex justify-center'>
                        <div className='bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20 dark:bg-gray-800/20 dark:border-gray-600/30'>
                            <div className='flex items-center gap-6 text-white/80 dark:text-gray-300'>
                                <span className='text-sm'>
                                    Total: <span className='font-semibold text-white dark:text-gray-100'>{todos.length}</span>
                                </span>
                                <span className='text-sm'>
                                    Completed: <span className='font-semibold text-green-400 dark:text-green-300'>{todos.filter(t => t.isCompleted).length}</span>
                                </span>
                                <span className='text-sm'>
                                    Remaining: <span className='font-semibold text-orange-400 dark:text-orange-300'>{todos.filter(t => !t.isCompleted).length}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Todos