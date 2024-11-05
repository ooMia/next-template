import { SetStateAction } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RadioStateHandler({
  labels,
  setter,
}: {
  labels: string[];
  setter: SetStateAction<any>;
}) {
  const handleValueChange = (value: string) => {
    setter(value);
  };

  return (
    <div className="select-none">
      <RadioGroup defaultValue={labels[0]} onValueChange={handleValueChange}>
        {/* <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div> */}
        {labels.map((label) => (
          <div className="flex items-center space-x-2" key={label}>
            <RadioGroupItem value={label} id={label} />
            <Label htmlFor={label}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
