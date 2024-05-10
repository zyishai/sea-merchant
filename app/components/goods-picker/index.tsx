import { Product, products } from "~/store/game";
import { Container, ProductItem, Image } from "./styles.module.css";
import { useState } from "react";
import { capitalize } from "~/utils";

export function GoodsPicker(props: { onProductSelected: (product: Product) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  return (
    <Container>
      {(Object.keys(products) as Product[]).map((product: Product) => (
        <ProductItem key={product} selected={selectedProduct === product} onClick={() => {
          setSelectedProduct(product);
          props.onProductSelected(product);
        }}>
          <h3>{capitalize(product)}</h3>
          <Image src={`public/${product}.svg`} />
        </ProductItem>
      ))}
    </Container>
  )
}
