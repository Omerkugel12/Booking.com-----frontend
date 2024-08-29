import { format } from "date-fns";
import { CircleCheck } from "lucide-react";

interface PropsTypes {
  dateSevenDaysBefore: Date | null;
}

function GoodToKnowComp({ dateSevenDaysBefore }: PropsTypes) {
  return (
    <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
      <h2 className="font-bold text-xl">Good to know:</h2>
      <div className="flex gap-4">
        <CircleCheck className="text-green" strokeWidth={1.8} />
        <p>
          Stay flexible: You can cancel for free before{" "}
          <span>
            {dateSevenDaysBefore
              ? format(dateSevenDaysBefore, "MMMM d, yyyy")
              : "N/A"}{" "}
          </span>{" "}
          - lock in this great price today.
        </p>
      </div>
    </div>
  );
}

export default GoodToKnowComp;
