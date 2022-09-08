import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store";

type Notificador = {
  notificar: (titulo: string, texto: string, tipo: TipoNotificacao) => void;
};

export default (): Notificador => {
  const notificar = (
    titulo: string,
    texto: string,
    tipo: TipoNotificacao
  ): void => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo,
    });
  };
  return {
    notificar,
  };
};
