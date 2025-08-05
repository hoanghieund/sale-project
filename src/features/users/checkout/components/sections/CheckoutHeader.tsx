import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

/**
 * Checkout page header: back + title
 * Keep UI simple and separate for reusability/independent testing
 */
interface Props {
  onBack: () => void;
  title: string;
  backIcon: ReactNode;
}

const CheckoutHeader = ({ onBack, title, backIcon }: Props) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" size="icon" onClick={onBack}>
        {backIcon}
      </Button>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default CheckoutHeader;