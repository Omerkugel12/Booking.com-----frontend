import { CircleCheck } from "lucide-react";

interface PropsTypes {
  nextStep: boolean;
}

function ProgressStepsBar({ nextStep }: PropsTypes) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleCheck
            fill="#006ce4"
            size={30}
            strokeWidth={1.75}
            color="#fff"
          />
          <p className="font-bold text-sm">Your selection</p>
        </div>
        <div className="flex-1 h-[1px] mx-4 bg-gray-300" />
        <div className="flex items-center gap-2">
          {!nextStep ? (
            <div className="flex justify-center items-center bg-nav_btn_text rounded-full w-6 h-6">
              <p className="text-white text-sm font-bold">2</p>
            </div>
          ) : (
            <CircleCheck
              fill="#006ce4"
              size={30}
              strokeWidth={1.75}
              color="#fff"
            />
          )}
          <p className="font-bold text-sm">Your details</p>
        </div>
        <div className="flex-1 h-[1px] mx-4 bg-gray-300" />
        <div className="flex items-center gap-2">
          <div
            className={`flex justify-center items-center w-6 h-6 rounded-full ${
              nextStep ? "bg-nav_btn_text" : "bg-white border-2 border-gray-500"
            } `}
          >
            <p
              className={`text-sm font-bold ${
                nextStep ? "text-white" : "text-gray-600"
              } `}
            >
              3
            </p>
          </div>
          <p
            className={`${
              !nextStep
                ? "font-bold text-sm text-gray-600"
                : "font-bold text-sm text-black"
            }`}
          >
            Final step
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressStepsBar;
