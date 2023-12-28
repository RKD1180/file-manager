import { createContext, useContext, useState } from "react";

// Create the context
const FileContext = createContext();

// Create a context provider component
const FileProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <FileContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => useContext(FileContext);

export { useFileContext, FileProvider };
