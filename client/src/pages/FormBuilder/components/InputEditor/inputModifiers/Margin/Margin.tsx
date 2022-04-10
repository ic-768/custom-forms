import { ChangeEvent } from "react";

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
    <div className="margin-modifier-container">
      <span> Margin </span>
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
  );
};

export default Margin;
