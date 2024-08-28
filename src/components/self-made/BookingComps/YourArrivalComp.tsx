import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleCheck, ConciergeBell } from "lucide-react";

function YourArrivalComp() {
  return (
    <div className="border-[1px] rounded-md flex flex-col p-3 gap-4">
      <h2 className="font-bold text-xl">Your arrival time</h2>
      <div className="flex gap-2 items-center">
        <CircleCheck className="text-green" strokeWidth={1.5} size={"32px"} />
        <p className="text-sm">
          Your room will be ready for check-in at 3:00 PM
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <ConciergeBell color="#227733" strokeWidth={1.5} size={"32px"} />
        <p className="text-sm">
          24-hour front desk – help whenever you need it!
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-bold">
          Add your estimated arrival time{" "}
          <span className="text-rose-700">*</span>
        </Label>
        <Select>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Please select</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">Time is for Tel Aviv time zone</p>
      </div>
    </div>
  );
}

export default YourArrivalComp;
