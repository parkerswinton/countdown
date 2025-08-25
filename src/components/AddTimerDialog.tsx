import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Timer } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Digital } from "./timers/Digital";
import { useState } from "react";
import { isPast } from "date-fns";

const formSchema = z.object({
  label: z.string().min(1),
  target: z.date().refine((date) => !isPast(date)),
  variant: z.enum(["digital", "other"]),
});

export const AddTimerDialog = ({
  onAdd,
}: {
  onAdd: (newTimer: Timer) => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      target: new Date(),
      variant: "digital" as const,
    },
  });

  const handleOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  const onSubmit = (vals: z.infer<typeof formSchema>) => {
    onAdd({ ...vals, x: 0, y: 0, id: crypto.randomUUID() });
    handleOpenChange(false);
  };

  const label = form.watch("label");
  const target = form.watch("target");
  const variant = form.watch("variant");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="z-50 size-8">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle>Add A New Countdown Timer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker field={field} />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-start justify-between">
              <FormField
                control={form.control}
                name="variant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="digital" />
                          </FormControl>
                          <FormLabel className="font-normal">Digital</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <FormLabel className="self-end">Preview</FormLabel>
                {variant === "digital" ? (
                  <Digital timer={{ id: "preview", target, label }} />
                ) : null}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button type="submit">
                <Plus />
                Add Timer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
