import { PersonStanding, TrendingUpIcon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart } from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IconMoneybag } from "@tabler/icons-react";

// Dummy data for affiliate marketing
const revenueData = [
  { month: "Jan", revenue: 12500, commissions: 3750 },
  { month: "Feb", revenue: 15200, commissions: 4560 },
  { month: "Mar", revenue: 18900, commissions: 5670 },
  { month: "Apr", revenue: 16800, commissions: 5040 },
  { month: "May", revenue: 22100, commissions: 6630 },
  { month: "Jun", revenue: 25400, commissions: 7620 },
];

const affiliateData = [
  { month: "Jan", active: 145, new: 23 },
  { month: "Feb", active: 168, new: 31 },
  { month: "Mar", active: 192, new: 28 },
  { month: "Apr", active: 215, new: 35 },
  { month: "May", active: 248, new: 42 },
  { month: "Jun", active: 267, new: 38 },
];

const productData = [
  { category: "Digital Products", sales: 45, fill: "var(--chart-1)" },
  { category: "Physical Products", sales: 30, fill: "var(--chart-2)" },
  { category: "Subscriptions", sales: 15, fill: "var(--chart-3)" },
  { category: "Services", sales: 10, fill: "var(--chart-4)" },
];

const conversionData = [
  { month: "Jan", rate: 3.2 },
  { month: "Feb", rate: 3.8 },
  { month: "Mar", rate: 4.1 },
  { month: "Apr", rate: 3.9 },
  { month: "May", rate: 4.5 },
  { month: "Jun", rate: 4.8 },
];

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  commissions: {
    label: "Commissions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const affiliateConfig = {
  active: {
    label: "Active Affiliates",
    color: "var(--chart-1)",
  },
  new: {
    label: "New Affiliates",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const productConfig = {
  sales: {
    label: "Sales",
  },
  digital: {
    label: "Digital Products",
    color: "var(--chart-1)",
  },
  physical: {
    label: "Physical Products",
    color: "var(--chart-2)",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-3)",
  },
  services: {
    label: "Services",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const conversionConfig = {
  rate: {
    label: "Conversion Rate",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RevenueCard() {
  return (
    <Card className="@container/card bg-transparent border-none shadow-none">
      <CardHeader className="relative pb-2">
        <CardDescription className="flex items-center gap-2"><IconMoneybag className="h-4 w-4 text-neutral-500" /> Total Revenue</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          $25,400
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +15.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={revenueConfig} className="h-[80px] w-full">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-0">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Revenue trending up <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Affiliate commissions: $7,620 this month
        </div>
      </CardFooter>
    </Card>
  );
}

export function AffiliatesCard() {
  return (
    <Card className="@container/card bg-transparent border-none shadow-none">
      <CardHeader className="relative pb-2">
        <CardDescription className="flex items-center gap-2"><PersonStanding className="h-4 w-4 text-neutral-500" /> Affiliate Payouts</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          $2,540
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +7.6%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={affiliateConfig} className="h-[80px] w-full">
          <BarChart data={affiliateData}>
            <Bar
              dataKey="active"
              fill="var(--color-active)"
              radius={[2, 2, 0, 0]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-0">
      <div className="grid grid-cols-2 gap-2 w-full">
            <div className="relative bg-muted-foreground/10 flex flex-col items-start gap-1 rounded-lg border p-3 overflow-hidden">
              <div className="text-xs text-muted-foreground">Avg. Payout</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">$34.50</div>
                <Badge variant="outline" className="h-5 text-xs">
                  <TrendingUpIcon className="size-3" />
                  +12%
                </Badge>
              </div>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, currentColor 25%, transparent 25%),
                    linear-gradient(-45deg, currentColor 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, currentColor 75%),
                    linear-gradient(-45deg, transparent 75%, currentColor 75%)
                  `,
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                  maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 70%)",
                }}
              />
            </div>
            <div className="relative bg-muted-foreground/10 flex flex-col items-start gap-1 rounded-lg border p-3 overflow-hidden">
              <div className="text-xs text-muted-foreground">Total Payout</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">$920.58</div>
                <Badge variant="outline" className="h-5 text-xs">
                  <TrendingUpIcon className="size-3" />
                  +3.1%
                </Badge>
              </div>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, currentColor 25%, transparent 25%),
                    linear-gradient(-45deg, currentColor 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, currentColor 75%),
                    linear-gradient(-45deg, transparent 75%, currentColor 75%)
                  `,
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                  maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 70%)",
                }}
              />
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}

export function ProductSalesCard() {
  return (
    <Card className="@container/card bg-transparent pt-1 border-none shadow-none">
      <CardHeader className="relative">
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          1,234+
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +12.5%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={productConfig} className="h-[120px] w-full">
          <PieChart>
            <Pie
              data={productData}
              dataKey="sales"
              nameKey="category"
              innerRadius={35}
              outerRadius={60}
              strokeWidth={2}
            >
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </PieChart>
        </ChartContainer>
        <div className="pt-2 w-full">
            <div className="relative bg-muted-foreground/10 flex flex-col items-start gap-1 rounded-lg border p-3 overflow-hidden">
              <div className="text-xs text-muted-foreground">Avg. Order Per Affiliate</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">20</div>
                <Badge variant="outline" className="h-5 text-xs">
                  <TrendingUpIcon className="size-3" />
                  +3.2%
                </Badge>
              </div>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, currentColor 25%, transparent 25%),
                    linear-gradient(-45deg, currentColor 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, currentColor 75%),
                    linear-gradient(-45deg, transparent 75%, currentColor 75%)
                  `,
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                  maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 70%)",
                }}
              />
            </div>
            </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-0">
      </CardFooter>
    </Card>
  );
}

export function ConversionRateCard() {
  return (
    <Card className="@container/card bg-transparent border-none shadow-none">
      <CardHeader className="relative pb-2">
        <CardDescription>Discount Code Usage</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          4.8%
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +0.7%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={conversionConfig} className="h-[150px] w-full">
          <AreaChart data={conversionData}>
            <defs>
              <linearGradient id="fillConversion" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="rate"
              type="natural"
              fill="url(#fillConversion)"
              stroke="var(--color-rate)"
              strokeWidth={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function BrandCharts() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <RevenueCard />
      <AffiliatesCard />
      <ProductSalesCard />
      <ConversionRateCard />
    </div>
  );
}
