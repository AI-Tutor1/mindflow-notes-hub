
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const SimpleCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || "0";
      const newValue = calculate(parseFloat(currentValue), inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(parseFloat(previousValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const buttonStyle = "h-12 text-lg font-medium";
  const operatorStyle = "h-12 text-lg font-medium bg-teal-600 hover:bg-teal-700 text-white";

  return (
    <Card className="w-full max-w-xs mx-auto">
      <CardContent className="p-4">
        {/* Display */}
        <div className="mb-4 p-3 bg-slate-100 rounded text-right text-2xl font-mono text-slate-900 min-h-[3rem] flex items-center justify-end">
          {display}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="outline" onClick={clear} className={buttonStyle}>
            C
          </Button>
          <Button variant="outline" onClick={clearEntry} className={buttonStyle}>
            CE
          </Button>
          <Button variant="outline" className={buttonStyle}>
            ±
          </Button>
          <Button onClick={() => inputOperation("÷")} className={operatorStyle}>
            ÷
          </Button>

          {/* Row 2 */}
          <Button variant="outline" onClick={() => inputNumber("7")} className={buttonStyle}>
            7
          </Button>
          <Button variant="outline" onClick={() => inputNumber("8")} className={buttonStyle}>
            8
          </Button>
          <Button variant="outline" onClick={() => inputNumber("9")} className={buttonStyle}>
            9
          </Button>
          <Button onClick={() => inputOperation("×")} className={operatorStyle}>
            ×
          </Button>

          {/* Row 3 */}
          <Button variant="outline" onClick={() => inputNumber("4")} className={buttonStyle}>
            4
          </Button>
          <Button variant="outline" onClick={() => inputNumber("5")} className={buttonStyle}>
            5
          </Button>
          <Button variant="outline" onClick={() => inputNumber("6")} className={buttonStyle}>
            6
          </Button>
          <Button onClick={() => inputOperation("-")} className={operatorStyle}>
            -
          </Button>

          {/* Row 4 */}
          <Button variant="outline" onClick={() => inputNumber("1")} className={buttonStyle}>
            1
          </Button>
          <Button variant="outline" onClick={() => inputNumber("2")} className={buttonStyle}>
            2
          </Button>
          <Button variant="outline" onClick={() => inputNumber("3")} className={buttonStyle}>
            3
          </Button>
          <Button onClick={() => inputOperation("+")} className={operatorStyle}>
            +
          </Button>

          {/* Row 5 */}
          <Button 
            variant="outline" 
            onClick={() => inputNumber("0")} 
            className={`${buttonStyle} col-span-2`}
          >
            0
          </Button>
          <Button variant="outline" onClick={inputDot} className={buttonStyle}>
            .
          </Button>
          <Button onClick={performCalculation} className={operatorStyle}>
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
