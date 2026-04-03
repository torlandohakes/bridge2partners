import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-heading">
          Bridge2Partners
        </h1>
        <p className="text-lg text-neutral/80">
          We are building the foundational platform for high-ticket B2B digital transformation and M&A advisory.
        </p>
        <div className="pt-4">
          <Link href="/brand">
            <Button size="lg">View Design System</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
