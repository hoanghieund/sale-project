import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

/**
 * Nút submit cho order để tách UI/disabled state rõ ràng
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