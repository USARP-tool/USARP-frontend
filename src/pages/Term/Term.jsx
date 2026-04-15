import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Wrapper from "../../layouts/Wrapper/Wrapper";

import Button from "../../components/ui/Button/Button";

import styles from "./styles.module.scss";

const Term = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Wrapper>
        <div style={{ marginBottom: "1rem" }}>
          <Button
            variant="text"
            fullWidth={false}
            onClick={() => navigate("/cadastro")}
            icon={<ArrowLeft size={20} />}
            iconPosition="start"
            sx={{
              justifyContent: "flex-start",
              paddingLeft: 0,
              minWidth: "auto",
              color: "inherit",
            }}
          >
            Voltar
          </Button>
        </div>

        <h1>Termos e Condições</h1>
        <p>Conteúdo dos termos aqui...</p>
      </Wrapper>
    </div>
  );
};

export default Term;
