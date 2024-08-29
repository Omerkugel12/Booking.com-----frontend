import { Button } from "@/components/ui/button";

interface PropTypes {
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

function PaymentContent({ setNextStep }: PropTypes) {
  return (
    <>
      <main className="">
        <Button onClick={() => setNextStep(false)} className="">
          back
        </Button>
        <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
          <h2 className="font-bold text-xl">When do you want to pay?</h2>
        </div>
      </main>
    </>
  );
}

export default PaymentContent;
