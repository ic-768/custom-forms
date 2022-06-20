import { ChangeEventHandler, ReactElement } from "react";

import { NumberInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";

import "./Margin.scss";

interface IMargin {
  marginTop: string;
  marginBottom: string;
  onChangeTopMargin: ChangeEventHandler<HTMLInputElement>;
  onChangeBottomMargin: ChangeEventHandler<HTMLInputElement>;
}

const Margin = ({
  marginTop,
  marginBottom,
  onChangeTopMargin,
  onChangeBottomMargin,
}: IMargin): ReactElement => {
  const marginTopValue = Number(marginTop.match(/\d+/)![0]).toString();
  const marginBottomValue = Number(marginBottom.match(/\d+/)![0]).toString();

  return (
    <InputContainer
      title="Margin"
      subtitle="Set the vertical spacings of the input"
      component={
        <div className="margin-modifier-container">
          <div className="margin-modifier-dashed-container">
            <NumberInput
              onChange={onChangeTopMargin}
              value={marginTopValue}
              className="margin-modifier-input top"
            />
            <NumberInput
              onChange={onChangeBottomMargin}
              value={marginBottomValue}
              className="margin-modifier-input bottom"
            />
          </div>
        </div>
      }
    />
  );
};

export default Margin;
