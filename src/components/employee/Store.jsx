import { useState } from "react";
import ScanCredential from "./ScanCredential";
import Menu from "./Menu";

const Store = () => {
  const [scaning, setScaning] = useState(true);
  const [matricula, setMatricula] = useState("");
  const [clientType, setClientType] = useState();

  const onChangeMatricula = (matricula) => {
    setMatricula(matricula);
  };

  const onChangeScaning = (scaning) => {
    setScaning(scaning);
  };

  const onChangeClientType = (clientType) => {
    setClientType(clientType);
  };

  const isScaning = () => {
    if (scaning) {
      return (
        <ScanCredential
          onChangeMatricula={onChangeMatricula}
          onChangeScaning={onChangeScaning}
          onChangeClientType={onChangeClientType}
        />
      );
    } else {
      return (
        <Menu
          matricula={matricula}
          clientType={clientType}
          onChangeMatricula={onChangeMatricula}
          onChangeScaning={onChangeScaning}
        />
      );
    }
  };

  return <>{isScaning()}</>;
};

export default Store;
