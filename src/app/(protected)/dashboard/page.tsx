"use client"

import React from 'react'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskList } from '@/components/TaskList';
import { TaskDialog } from '@/components/TaskDialog';

const DashboardPage = () => {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
      const [activeFilter, setActiveFilter] = useState("all");
  return (
    <div>
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your tasks efficiently</p>
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)} size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <TaskStats />
      
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-64 flex-shrink-0">
          <TaskFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>
        
        <div className="flex-grow">
          <TaskList filter={activeFilter} />
        </div>
      </div>
    </div>

    <TaskDialog 
      open={isTaskDialogOpen} 
      onOpenChange={setIsTaskDialogOpen} 
    />
  </div>
  )
}

export default DashboardPage
