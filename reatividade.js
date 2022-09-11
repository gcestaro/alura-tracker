const projeto = {
  id: 1,
  descricao: "Alura Tracker 3.0",
};

const proxy = new Proxy(projeto, {
  get(objetoOriginal, chave, receptor) {
    console.log(`Alguém pediu a chave ${chave} do projeto`);
    return Reflect.get(objetoOriginal, chave, receptor);
  },
  set(objetoOriginal, chave, valor) {
    console.log(
      `Alguém pediu para mudar o valor da chave ${chave} do projeto de ${objetoOriginal[chave]} para ${valor}`
    );
    objetoOriginal[chave] = valor;
  },
});

proxy.descricao = "Reatividade";

console.log(proxy.descricao);
