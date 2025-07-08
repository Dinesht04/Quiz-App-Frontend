"use client"

import { useEffect, useState } from "react"
import DashboardBackgroundAnimation from "./DashboardBackgroundAnimation"
import Statistics from "./Statistics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Tutorial from "./Tutorial"
import BattleStatistics from "./BattleStatistics"
import TrendingTopics from "./TrendingTopics"
import { Play, Plus, Rocket, Sparkles, Users, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NewJoinRoomCard } from "./Cards/JoinRoom"
import { useGlobalContext } from "../providers/GlobalContext"
import { useSession } from "next-auth/react"

type DashboardProps = {
  session : any;
  isGuest : boolean;
}


export default function Dashboard({session,isGuest}:DashboardProps) {

  const {username} = useGlobalContext();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Cosmic Background */}
     <DashboardBackgroundAnimation/>
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            <Statistics
              session={session}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Quick Actions */}
            {/* checking if guest user or not, if session exists then not. setting username accordingly. */}
            {
              session && session.data?.user?.name ?
              <NewJoinRoomCard
              username={session.data?.user?.name}
              /> :
              <NewJoinRoomCard
              username={username}
              />
            }

            {/* How It Works Tutorial */}
             <Tutorial/>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced User Stats */}
            <BattleStatistics/>
            {/* Enhanced Trending Topics */}
            <TrendingTopics/>
          </div>
        </div>
      </div>
    </div>
  )
}
