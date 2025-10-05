import { Card, CardBody } from "@heroui/react";
import {
  CircleDollarSign,
  List,
  ListChecks,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

export default function KPIs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card isBlurred>
        <CardBody className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Total Revenue</h1>
            <CircleDollarSign size={20} color="#1800AD" />
          </div>
          <p className="text-lg font-medium primary-text">&#x20B9; 5489</p>
        </CardBody>
      </Card>
      <Card isBlurred>
        <CardBody className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Total Sales</h1>
            <TrendingUp size={20} color="#1800AD" />
          </div>
          <p className="text-lg font-medium primary-text flex items-center gap-2">
            <ListChecks size={18} className="font-medium" /> 120
          </p>
        </CardBody>
      </Card>
      <Card isBlurred>
        <CardBody className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Total Users</h1>
            <Users size={20} color="#1800AD" />
          </div>
          <p className="text-lg font-medium primary-text flex items-center gap-2">
            <UserCheck size={18} className="font-medium" />
            390
          </p>
        </CardBody>
      </Card>
      <Card isBlurred>
        <CardBody className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Total Products</h1>
            <ShoppingBag size={20} color="#1800AD" />
          </div>
          <p className="text-lg font-medium primary-text flex items-center gap-2">
            <List size={18} className="font-medium" />
            1855
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
