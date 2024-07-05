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
import { PiSealCheckFill } from "react-icons/pi";

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
            Unlock all features of our AI with the Elite plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Unlimited API requests
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Advanced AI models
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Priority customer support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Unlimited projects
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Unlimited team members
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                1TB storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">$49.99</div>
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
            Access powerful features with the Premium plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <PiSealCheckFill className="w-5 h-5 mt-1 fill-primary" />
                1,000 API requests per month
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Access to AI models
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Email support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                10 projects
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                10 team members
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                100GB storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">$29.99</div>
          <div className="text-muted-foreground">per month</div>
          <Button className="w-full">Get Premium</Button>
        </CardFooter>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Free</CardTitle>
          <CardDescription className="text-muted-foreground">
            Start exploring with our Free plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                100 API requests per month
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Access to basic AI models
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                Community support
              </li>
            </ul>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Usage Limits</h3>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />1 project
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />1 team
                member
              </li>
              <li className="flex items-center gap-2">
                <PiSealCheckFill className="w-5 h-5 fill-primary" />
                5GB storage
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
