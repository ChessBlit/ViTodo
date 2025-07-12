"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Users, Calendar, ArrowRight, Star, Play, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Smart Task Management",
      description: "Organize your tasks with intelligent categorization and priority sorting that adapts to your workflow patterns.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Sync",
      description: "Real-time synchronization across all devices with offline support. Your tasks are always up to date.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and security compliance to keep your data safe and private.",
      gradient: "from-red-500 to-rose-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "ViTodo has streamlined our project management workflow. The team collaboration features are exactly what we needed.",
      rating: 5,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Michael Rodriguez",
      role: "Freelance Designer",
      company: "Independent",
      content: "As a freelancer juggling multiple clients, ViTodo's smart scheduling has been a game-changer for my productivity.",
      rating: 5,
      gradient: "from-green-500 to-teal-600"
    },
    {
      name: "Emma Thompson",
      role: "Startup Founder",
      company: "InnovateLab",
      content: "The AI-powered insights help me prioritize tasks effectively. It's like having a personal productivity assistant.",
      rating: 5,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Hero Section */}
      <div className="hero relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-white/20 to-white/10 text-white border-white/20 hover:bg-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Productivity
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
              Intelligent Task Management
              <span className="block bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your productivity with ViTodo&apos;s AI-driven insights, seamless collaboration, and intelligent automation that adapts to your unique workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href={"/signup"}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-white to-blue-50 text-blue-700 hover:from-blue-50 hover:to-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  Start Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="desc py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Why Choose ViTodo?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                ViTodo isn&apos;t just another task manager. It&apos;s a comprehensive productivity platform that learns from your habits and helps you optimize your workflow with cutting-edge AI technology.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-100 dark:border-blue-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">AI-Powered Insights</h3>
                    <p className="text-gray-600 dark:text-gray-300">Get personalized recommendations based on your productivity patterns and work habits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 border border-green-100 dark:border-green-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Cross-Platform Sync</h3>
                    <p className="text-gray-600 dark:text-gray-300">Access your tasks on any device with lightning-fast real-time synchronization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-100 dark:border-purple-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Enterprise Ready</h3>
                    <p className="text-gray-600 dark:text-gray-300">Scalable solution with advanced security, compliance, and administrative controls.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-3xl p-12 text-center text-white shadow-2xl">
                <div className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">98%</div>
                <p className="text-2xl font-bold mb-4">User Satisfaction</p>
                <p className="text-blue-100 text-lg leading-relaxed">Join over 50,000 satisfied users who have transformed their productivity with ViTodo&apos;s intelligent features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-800 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to stay organized, productive, and focused on what matters most, powered by intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testinomials py-20 lg:py-32 bg-gradient-to-br from-white via-green-50 to-teal-50 dark:from-slate-900 dark:via-green-900/10 dark:to-teal-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it. Here&apos;s what productivity experts and successful teams are saying about ViTodo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
                    &quot;{testimonial.content}&quot;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center font-bold text-white text-lg`}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="relative z-10 py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have already revolutionized their workflow with ViTodo&apos;s intelligent task management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={"/signup"}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-white to-blue-50 text-blue-700 hover:from-blue-50 hover:to-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  Start Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}