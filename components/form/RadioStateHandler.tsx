import { SetStateAction } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

export function RadioStateHandler({
  labels,
  setter,
  isDisabled = false,
}: {
  labels: string[];
  setter: SetStateAction<any>;
  isDisabled?: boolean;
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
            {<RadioGroupItem value={label} id={label} disabled={isDisabled} />}
            <Label htmlFor={label}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export function CheckBoxBooleanStateHandler({
  label,
  setter,
  isDisabled = false,
}: {
  label: string;
  setter: SetStateAction<any>;
  isDisabled?: boolean;
}) {
  const handleValueChange = (value: boolean) => {
    setter(value);
  };

  return (
    <div className="select-none flex items-center space-x-2">
      {
        <Checkbox
          className="disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through "
          id={label}
          defaultChecked={false}
          onCheckedChange={handleValueChange}
          disabled={isDisabled}
        />
      }
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
