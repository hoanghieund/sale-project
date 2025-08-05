import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

/**
 * Submit button for order to clearly separate UI/disabled state
 */
interface Props {
  isProcessing: boolean;
  labelProcessing: ReactNode;
  labelDefault: ReactNode;
}

const SubmitOrderButton = ({ isProcessing, labelProcessing, labelDefault }: Props) => {
  return (
    <Button type="submit" className="w-full mt-6" size="lg" disabled={isProcessing}>
      {isProcessing ? labelProcessing : labelDefault}
    </Button>
  );
};

export default SubmitOrderButton;