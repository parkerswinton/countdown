import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { endOfYesterday, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Input } from "./input";

export const DatePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
}) => {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            required
            disabled={(date) => date < endOfYesterday()}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        id="time-picker"
        step="1"
        defaultValue="00:00:00"
        disabled
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        // value={format(field.value, "HH:mm:ss")}
        // onChange={(e) =>
        //   field.onChange((prev: Date) => handleTimeChange(prev, e.target.value))
        // }
      />
    </div>
  );
};
