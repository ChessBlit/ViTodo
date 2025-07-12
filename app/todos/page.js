"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TodoSchema } from '../schemas/todo.schema';
import { Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlusCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useRouter } from 'next/navigation';

const Todos = () => {
    const router = useRouter();
    const [todos, setTodos] = useState([])
    const [open, setOpen] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showFinished, setShowFinished] = useState(true)
    const form = useForm({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
            content: "",
            priority: "1"
        }
    });
    const fetchTodos = useCallback(async () => {

        const requestOptions = {
            cache: 'no-store',
            method: "POST",
            redirect: "follow"
        };

        try {
            const response = await fetch("/api/todos/getAll", requestOptions);
            const result = await response.json();
            if (result.status === 401) {
                router.push("/login")
                return;
            }
            setTodos(result.todos)
        } catch (error) {
            console.error(error);
        }
    }, [router])
    useEffect(() => {
        fetchTodos()

    }, [fetchTodos])

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

        const raw = JSON.stringify({ content: values.content, priority: parseInt(values.priority) });

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
            console.log(data);
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
            form.setValue("content", "")
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

    function getUncompletedByPriority(priority) {
        return todos.filter(
            (todo) => todo.priority === priority && !todo.isCompleted
        );
    }
    function sortByPriority(priorities) {
        return <div className='bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-black/10 shadow-2xl overflow-hidden dark:bg-gray-800/20 dark:border-gray-600/30'>
            {todos && todos.length > 0 ? (
                <div className='divide-y divide-black/10 dark:divide-gray-600/20'>
                    {todos.filter(todo => priorities.includes(todo.priority)).map(todo => (
                        (showFinished || !todo.isCompleted) && <div
                            key={todo._id}
                            className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-200 hover:bg-white/5 dark:hover:bg-gray-700/20 ${todo.isCompleted ? 'opacity-60' : ''
                                }`}
                        >
                            <Checkbox
                                disabled={disabled}
                                checked={todo.isCompleted}
                                onCheckedChange={() => { handleCheckChange(todo._id, !todo.isCompleted) }}
                                className='data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 dark:border-gray-500 dark:data-[state=checked]:bg-green-600 dark:data-[state=checked]:border-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0'
                            />

                            <span
                                className={`flex-1 text-sm sm:text-base transition-all duration-200 break-words min-w-0 ${todo.isCompleted
                                    ? 'line-through text-black/50 dark:text-gray-400'
                                    : 'text-black dark:text-gray-200'
                                    }`}
                            >
                                {todo.content}
                            </span>
                            <AlertDialog>
                                <AlertDialogTrigger
                                    disabled={disabled}
                                    variant="ghost"
                                    size="sm"
                                    className='text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/20 flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 p-0 flex justify-center items-center rounded-md'
                                >

                                    <Trash className='h-3 w-3 sm:h-4 sm:w-4' />

                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Are you sure to delete the todo named &quot;{todo.content}&quot;
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(todo._id)}
                                        >Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    ))}
                </div>
            ) : (
                <div className='px-4 sm:px-6 py-8 sm:py-12 text-center'>
                    <div className='text-black/60 dark:text-gray-400 text-base sm:text-lg mb-2'>No tasks yet</div>
                    <p className='text-balck/40 dark:text-gray-500 text-sm sm:text-base'>Add your first task to get started!</p>
                </div>
            )}
        </div>
    }


    return (
        <main className='bg-gradient-to-br py-20 from-white via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 min-h-screen'>
            {/* Header Section */}
            <div className='px-4 sm:px-6 py-4 sm:py-8'>
                <div className='max-w-4xl mx-auto'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4'>
                        <div className='flex-1 min-w-0'>
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-gray-100 mb-2 break-words'>My Tasks</h1>
                            <p className='text-sm sm:text-base text-gray-500 dark:text-gray-300'>Stay organized and get things done</p>
                        </div>
                        <div className='w-full sm:w-auto md:mt-10'>
                            <AlertDialog open={open} onOpenChange={setOpen} >
                                <AlertDialogTrigger asChild >
                                    <Button
                                        size="lg"
                                    >
                                        <PlusCircle className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                                        <span className='text-sm sm:text-base'>Add Task</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-white/95 backdrop-blur-xl border-white/20 dark:bg-gray-800/95 dark:border-gray-600/30 w-[95vw] max-w-md mx-auto'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className='text-gray-800 dark:text-gray-100 text-lg sm:text-xl'>Add a New Task</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-center">
                                            <FormField
                                                control={form.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="What needs to be done?"
                                                                className="w-full bg-white/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700/80 dark:border-gray-600 dark:focus:border-purple-400 dark:text-white dark:placeholder-gray-400 text-sm sm:text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="priority"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <ToggleGroup type="single" className={"mx-auto"} variant={"outline"} onValueChange={(val) => field.onChange(val)}>
                                                                <ToggleGroupItem value={1} className={"px-2 dark:hover:bg-slate-700 hover:bg-gray-200 data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-slate-900"}>Low</ToggleGroupItem>
                                                                <ToggleGroupItem value={2} className={"px-4 dark:hover:bg-slate-700 hover:bg-gray-200 data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-slate-900"}>Medium</ToggleGroupItem>
                                                                <ToggleGroupItem value={3} className={"px-2 dark:hover:bg-slate-700 hover:bg-gray-200 data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-slate-900"}>High</ToggleGroupItem>
                                                            </ToggleGroup>
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )}
                                            />
                                            <AlertDialogFooter className='flex-col sm:flex-row gap-2'>
                                                <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white w-full sm:w-auto order-2 sm:order-1'>Cancel</AlertDialogCancel>
                                                <Button type={"submit"} className='w-full sm:w-auto order-1 sm:order-2'>Add Task</Button>
                                            </AlertDialogFooter>
                                        </form>
                                    </Form>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <Checkbox
                            checked={showFinished}
                            onCheckedChange={() => setShowFinished(!showFinished)}
                            className='h-4 w-4 sm:h-5 sm:w-5 bg-white'
                        />
                        <span className='text-sm sm:text-base text-black/80 dark:text-gray-300'>Show completed tasks</span>
                    </div>
                </div>
            </div>

            {/* Todo List Section */}
            <Tabs defaultValue="all" className="flex justify-center w-[80%] mx-auto">
                {/* {console.log(todos.filter((todo) => todo.priority === 1).length)} */}
                <TabsList className={"mx-auto dark:bg-black/20 bg-gray-200/50"}>
                    <TabsTrigger value="low" className={"flex items-center justify-center"}>Low {(getUncompletedByPriority(1).length !== 0) &&
                        (<Badge variant={getUncompletedByPriority(1).length ? "destructive" : "default"} className={"rounded-full p-0.5"}>
                        </Badge>)
                    }</TabsTrigger>
                    <TabsTrigger value="medium" className={"flex items-center justify-center"}>Medium {getUncompletedByPriority(2).length !== 0 &&
                        (<Badge variant={getUncompletedByPriority(2).length ? "destructive" : "default"} className={"rounded-full p-0.5"}>
                        </Badge>)
                    }</TabsTrigger>
                    <TabsTrigger value="high" className={"flex items-center justify-center"}>High {getUncompletedByPriority(3).length !== 0 &&
                        (<Badge variant={getUncompletedByPriority(3).length ? "destructive" : "default"} className={"rounded-full p-0.5"}>
                        </Badge>)
                    }</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="low">{sortByPriority([1])}</TabsContent>
                <TabsContent value="medium">{sortByPriority([2])}</TabsContent>
                <TabsContent value="high">{sortByPriority([3])}</TabsContent>
                <TabsContent value="all">{sortByPriority([1, 2, 3])}</TabsContent>
            </Tabs>
            <div className="todos max-w-4xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">


                {/* Stats Section */}
                {todos && todos.length > 0 && (
                    <div className='mt-4 sm:mt-6 flex justify-center'>
                        <div className='bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 border border-white/20 dark:bg-gray-800/20 dark:border-gray-600/30 w-full sm:w-auto'>
                            <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white/80 dark:text-gray-300'>
                                <span className='text-xs sm:text-sm text-black dark:text-white'>
                                    Total: <span className='font-semibold text-black dark:text-gray-100'>{showFinished ? todos.length : todos.filter(t => !t.isCompleted).length}</span>
                                </span>
                                {showFinished &&

                                    <span className='text-xs sm:text-sm text-black dark:text-white'>
                                        Completed: <span className='font-semibold text-green-400 dark:text-green-300'>{todos.filter(t => t.isCompleted).length}</span>
                                    </span>
                                }
                                <span className='text-xs sm:text-sm text-black dark:text-white'>
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