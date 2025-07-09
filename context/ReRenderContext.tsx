import React, { ReactNode, createContext, useState } from 'react';

type ReRenderContextType = {
  reRender: boolean;
  setreRender: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReRenderContext = createContext<ReRenderContextType>({
  reRender: false,
  setreRender: () => {},
} as ReRenderContextType);

// export const ReRenderContext = createContext<Partial<ReRenderContextType>>({})

type ReRenderProviderProps = {
  children: ReactNode;
};
export default function ReRenderProvider({ children }: ReRenderProviderProps) {
  const [reRender, setreRender] = useState(false);

  const values = {
    reRender,
    setreRender,
  };

  return (
    <ReRenderContext.Provider value={values}>
      {children}
    </ReRenderContext.Provider>
  );
}
