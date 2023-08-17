class CaixaDaLanchonete {
  productPrices = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2.0,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };

  mains = ["cafe", "suco", "sanduiche", "salgado"];
  paymentMethods = ["dinheiro", "debito", "credito"];

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (this.paymentMethods.includes(metodoDePagamento) == false) {
      return "Forma de pagamento inválida!";
    }

    var containsMain = false;

    // Check exception
    for (const item of itens) {
      const parts = item.split(",");

      const product = parts[0].split(" ")[0];
      const quantity = parts[1];

      if (this.productPrices.hasOwnProperty(product) == false) {
        return "Item inválido!";
      }
      if (quantity == 0) {
        return "Quantidade inválida!";
      }

      if (this.mains.includes(product) && containsMain == false) {
        containsMain = true;
      }
    }

    if (containsMain == false) {
      return "Item extra não pode ser pedido sem o principal";
    }

    // Calculate total
    var total = 0;

    for (const item of itens) {
      const parts = item.split(",");

      const product = parts[0];
      const quantity = parts[1];

      total += this.productPrices[product] * quantity;
    }
    switch (metodoDePagamento) {
      case "dinheiro":
        total = total * 0.95;
        break;
      case "credito":
        total = total * 1.03;
        break;
    }
    return "R$ " + total.toFixed(2).replace(".", ",");
  }
}

export { CaixaDaLanchonete };
