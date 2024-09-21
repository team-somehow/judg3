import { createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export const DataContext = createContext<any>({});

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: Props) => {
  return (
    <DataContext.Provider
      value={{
        "Polygon Amoy": {
          eventTransactionHash:
            "0x7abb9e00b752c20669136ecea96570e579fb1d6968fa0bca9322add6bd32f6eb",
          addProjectTransactionHash:
            "0x4ec90f6cee23f29b8a99cdbc82047bb31ab1b7de42623addd7cab1a491450077",
          addVoterTransactionHash:
            "0x79f5e2d9cb58b5e5161da89e16af462aa0052131d73ed561dbccdd0d49218ba6",
          approveVoterTransactionHash:
            "0xc82236a1290bb09dc400b341a350547278633c4d842bb5084f4b77e03e5f88fa",
          castVoteHash:
            "V0x18b9328d7fe63bafae407873cc97d35561ea23de80cdc2fe1dd9b690d935ccdb",
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
