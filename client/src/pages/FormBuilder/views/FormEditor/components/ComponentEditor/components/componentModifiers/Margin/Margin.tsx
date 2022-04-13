import { ChangeEvent } from "react";

import InputContainer from "../../../../../../../components/inputs/InputContainer";

import "./Margin.scss";

interface IMargin {
  marginTop: string;
  marginBottom: string;
  onChangeTopMargin: (v: ChangeEvent<HTMLInputElement>) => void;
  onChangeBottomMargin: (v: ChangeEvent<HTMLInputElement>) => void;
}

const Margin = ({
  marginTop,
  marginBottom,
  onChangeTopMargin,
  onChangeBottomMargin,
}: IMargin) => {
  const marginTopValue = Number(marginTop.match(/\d+/)![0]).toString();
  const marginBottomValue = Number(marginBottom.match(/\d+/)![0]).toString();

  return (
    <InputContainer
      title="Margin"
      subtitle="Set the vertical spacings of the input"
      component={
        <div className="margin-modifier-container">
          <div className="margin-modifier-dashed-container">
            <input
              onChange={onChangeTopMargin}
              value={marginTopValue}
              className="margin-modifier-input top"
              type="number"
            />
            <input
              onChange={onChangeBottomMargin}
              value={marginBottomValue}
              className="margin-modifier-input bottom"
              type="number"
            />
          </div>
        </div>
      }
    />
  );
};

export default Margin;
