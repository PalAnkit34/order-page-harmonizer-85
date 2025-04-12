
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, Loader, DollarSign, HourglassIcon, BaggageClaim } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock order statistics data
const orderStats = {
  completed: 46,
  pending: 12,
  inProgress: 24,
  totalOrders: 82,
  paymentsReceived: 160000,
  paymentsPending: 45000,
};

// Mock recent orders data
const recentOrders = [
  { id: 'ORD-1234', customer: 'Acme Corp', product: 'Canvas Tote', status: 'completed', amount: 2500 },
  { id: 'ORD-1235', customer: 'Globex', product: 'Leather Satchel', status: 'pending', amount: 4800 },
  { id: 'ORD-1236', customer: 'Stark Industries', product: 'Backpack', status: 'in-progress', amount: 3200 },
  { id: 'ORD-1237', customer: 'Wayne Enterprises', product: 'Messenger Bag', status: 'completed', amount: 2900 },
  { id: 'ORD-1238', customer: 'Umbrella Corp', product: 'Duffel Bag', status: 'in-progress', amount: 3800 },
];

// Data for the bar chart
const orderChartData = [
  { name: 'Jan', orders: 18 },
  { name: 'Feb', orders: 24 },
  { name: 'Mar', orders: 30 },
  { name: 'Apr', orders: 25 },
  { name: 'May', orders: 32 },
  { name: 'Jun', orders: 28 },
];

export const Dashboard = () => {
  const totalPayments = orderStats.paymentsReceived + orderStats.paymentsPending;
  const percentComplete = (orderStats.completed / orderStats.totalOrders) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Test Bag Manufacturer's order management system.</p>
        </div>
        <div className="flex items-center gap-2">
          <BaggageClaim className="h-8 w-8 text-purple" />
          <span className="text-2xl font-bold text-purple">Test</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
              <div className="p-2 bg-purple/10 rounded-full">
                <BaggageClaim className="h-5 w-5 text-purple" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={percentComplete} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {percentComplete.toFixed(0)}% completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{orderStats.completed}</div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{orderStats.pending}</div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{orderStats.inProgress}</div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Loader className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Received</span>
                </div>
                <div className="text-2xl font-bold">
                  ${orderStats.paymentsReceived.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HourglassIcon className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-muted-foreground">Pending</span>
                </div>
                <div className="text-2xl font-bold">
                  ${orderStats.paymentsPending.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Payments</p>
              <div className="flex justify-between items-center">
                <Progress value={(orderStats.paymentsReceived / totalPayments) * 100} className="h-2" />
                <span className="ml-2 text-sm font-medium">${totalPayments.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: {
                  label: "Orders",
                  theme: {
                    light: "#8B5CF6",
                    dark: "#9b87f5"
                  }
                }
              }}
              className="h-[300px]"
            >
              <BarChart data={orderChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.status === 'completed' && (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Completed</span>
                        </>
                      )}
                      {order.status === 'pending' && (
                        <>
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>Pending</span>
                        </>
                      )}
                      {order.status === 'in-progress' && (
                        <>
                          <Loader className="h-4 w-4 text-blue-500" />
                          <span>In Progress</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
