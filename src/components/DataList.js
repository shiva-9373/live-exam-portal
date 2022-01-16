import React, { useState } from "react";

const MyForm = () => {
  const [options, setOptions] = useState(["Apples", "Oranges", "Bananas", "Grapes"]);

  const handleChange = (event) => {
      console.log(event.target.value)
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
  };

  const clear = (event) => {
    event.target.value = "";
  };

  return (
    <>
      <input
        type="input"
        list="optionsList"
        onChange={handleChange}
        onClick={clear}
        onFocus={clear}
        placeholder="Select an option"
      />
      <datalist id="optionsList">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </datalist>
    </>
  );
};

export default MyForm;