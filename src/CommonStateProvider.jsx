// CommonStateProvider.jsx
import React, { createContext, useContext, useState } from "react";

const CommonStateContext = createContext();
export const useCommonStateContext = () => useContext(CommonStateContext);

export const CommonStateProvider = ({ children }) => {
  // TODO: Figure out later if this is really necessary

  const [controlsTarget, setControlsTarget] = useState(null);

  return (
    <CommonStateContext.Provider
      value={{
        controlsTarget,
        setControlsTarget,
      }}
    >
      {children}
    </CommonStateContext.Provider>
  );
};
