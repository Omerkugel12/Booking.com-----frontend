import { Button } from "../ui/button";

const support = [
  { id: 1, name: "Coronavirus (COVID-19) FAQs" },
  { id: 2, name: "Manage your trips" },
  { id: 3, name: "Contact Customer Service" },
  { id: 4, name: "Safety Resource Center" },
];

const discover = [
  { id: 5, name: "Genius loyalty program" },
  { id: 6, name: "Seasonal and holiday deals" },
  { id: 7, name: "Travel articles" },
  { id: 8, name: "Booking.com for Business" },
  { id: 9, name: "Traveller Review Awards" },
  { id: 10, name: "Car rental" },
  { id: 11, name: "Flight finder" },
  { id: 12, name: "Restaurant reservations" },
  { id: 13, name: "Booking.com for Travel Agents" },
];

const termsAndSettings = [
  { id: 14, name: "Privacy & cookies" },
  { id: 15, name: "Terms & conditions" },
  { id: 16, name: "Partner dispute" },
  { id: 17, name: "Modern Slavery Statement" },
  { id: 18, name: "Human Rights Statement" },
];

const partners = [
  { id: 19, name: "Extranet login" },
  { id: 20, name: "Partner help" },
  { id: 21, name: "List your property" },
  { id: 22, name: "Become an affiliate" },
];

const about = [
  { id: 23, name: "About Booking.com" },
  { id: 24, name: "How We Work" },
  { id: 25, name: "Sustainability" },
  { id: 26, name: "Press center" },
  { id: 27, name: "Careers" },
  { id: 28, name: "Investor relations" },
  { id: 29, name: "Corporate contact" },
];

function Footer() {
  return (
    <div className="bg-footer">
      <div className="mx-40 bg-footer py-6">
        <div className="flex flex-col gap-2 border-b-2 p-6">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col">
              <h1 className="font-bold">Support</h1>
              {support.map((item) => {
                return <a key={item.id}>{item.name}</a>;
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">Discover</h1>
              {discover.map((item) => {
                return <a key={item.id}>{item.name}</a>;
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">Terms and settings</h1>
              {termsAndSettings.map((item) => {
                return <a key={item.id}>{item.name}</a>;
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">Partners</h1>
              {partners.map((item) => {
                return <a key={item.id}>{item.name}</a>;
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">About</h1>
              {about.map((item) => {
                return <a key={item.id}>{item.name}</a>;
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-footer rounded-sm">
              <div className=" flex justify-center size-7 rounded-full overflow-hidden ">
                <img src="/src/images/US.png" alt="" />
              </div>
            </Button>
            <Button className="bg-footer rounded-sm text-black">ILS</Button>
          </div>
        </div>
        <div className="flex flex-col gap-0 justify-center items-center py-6">
          <p>
            Booking.com is part of Booking Holdings Inc., the world leader in
            online travel and related services.
          </p>
          <p>Copyright © 1996–2024 Booking.com™. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
