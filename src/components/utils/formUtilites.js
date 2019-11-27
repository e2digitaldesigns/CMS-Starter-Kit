import React from "react";

const RightSettingsRadio = ({ sType, name, label, checked, onChange }) => {
  return (
    <React.Fragment>
      <span className="text-label">{label}</span>
      <span className="switch-holder">
        <label className="switch">
          <input
            checked={checked}
            type="checkbox"
            className={sType}
            name={name}
            onChange={onChange}
          />
          <div className="slider round" />
        </label>
      </span>
    </React.Fragment>
  );
};

export { RightSettingsRadio };
