import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { GrDiamond } from "react-icons/gr";

const PricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 font-bold">
            <RiPoliceBadgeLine size={30} className="text-primary" />
            Elite
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Unlock the full potential of our AI platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Unlimited API requests
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Dedicated support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Unlimited models
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Unlimited users
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Unlimited storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">$18.99</div>
          <div className="text-muted-foreground">per month</div>
          <Button className="w-full">Get Elite</Button>
        </CardFooter>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <GrDiamond size={30} />
            Premium
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Elevate your AI experience with our Premium plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                500 API requests per month
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Basic analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Email support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />5 models
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />5 users
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                10GB storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">$12.99</div>
          <div className="text-muted-foreground">per month</div>
          <Button className="w-full">Get Premium</Button>
        </CardFooter>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Free</CardTitle>
          <CardDescription className="text-muted-foreground">
            Get started with our free AI platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                100 API requests per month
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Basic analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                Community support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />1 model
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />1 user
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                1GB storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">$0.00</div>
          <div className="text-muted-foreground">per month</div>
          <Button className="w-full">Get Free</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCards;

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
