import { createContext, useState  } from "react";

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
  
    return (
      <HomeContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
        {children}
      </HomeContext.Provider>
    );
  };
