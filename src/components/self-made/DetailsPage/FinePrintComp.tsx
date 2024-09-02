import { Button } from "@/components/ui/button";

function FinePrintComp() {
  return (
    <section id="theFinePrint" className="my-8">
      <div className="">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">The fine print</h1>
          <Button className="bg-nav_btn_text rounded-[5px] text-sm hover:bg-blue_1">
            <a href="#info&prices">See availability</a>
          </Button>
        </div>
        <p className="text-gray-600">
          Must-know information for guests at this property
        </p>
      </div>
      <div className="mt-4 border rounded-md p-4 flex flex-col gap-4">
        <p className="text-sm">
          Children under 21 must be accompanied by adults aged 21 and over. This
          condition does not apply to soldiers showing their ID card at the
          moment of check in.
        </p>
        <p className="text-sm">
          When booking more than 4 rooms, different policies and additional
          supplements may apply.
        </p>
        <p className="text-sm">
          Guests are required to show a photo ID and credit card upon check-in.
          Please note that all Special Requests are subject to availability and
          additional charges may apply.
        </p>
        <p className="text-sm">
          Please inform Sahara Hotel Eilat of your expected arrival time in
          advance. You can use the Special Requests box when booking, or contact
          the property directly using the contact details in your confirmation.
        </p>
      </div>
    </section>
  );
}

export default FinePrintComp;
