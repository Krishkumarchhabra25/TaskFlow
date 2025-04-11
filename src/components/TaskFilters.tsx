
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Users,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function TaskFilters({ activeFilter, setActiveFilter }: TaskFiltersProps) {
  const filters = [
    { id: "all", label: "All Tasks", icon: LayoutDashboard },
    { id: "in-progress", label: "In Progress", icon: Clock },
    { id: "completed", label: "Completed", icon: CheckCircle },
    { id: "high", label: "High Priority", icon: AlertCircle },
    { id: "today", label: "Due Today", icon: Calendar },
    { id: "shared", label: "Shared With Me", icon: Users },
    { id: "favorites", label: "Favorites", icon: Star },
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-1">
          {filters.map((filter) => (
            <li key={filter.id}>
              <button
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  activeFilter === filter.id
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <filter.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>{filter.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}