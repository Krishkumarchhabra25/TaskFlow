
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, ListChecks } from "lucide-react";

export function TaskStats() {
  // In a real app, this would come from API
  const stats = [
    { label: "Total Tasks", value: 24, icon: ListChecks, color: "bg-blue-500" },
    { label: "Completed", value: 12, icon: CheckCircle, color: "bg-green-500" },
    { label: "In Progress", value: 8, icon: Clock, color: "bg-amber-500" },
    { label: "High Priority", value: 4, icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}