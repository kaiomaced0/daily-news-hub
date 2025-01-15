import React from "react";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";

interface DateFilterProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateFilter = ({ date, onDateChange }: DateFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          From: {date.toLocaleDateString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={(date) => date && onDateChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;