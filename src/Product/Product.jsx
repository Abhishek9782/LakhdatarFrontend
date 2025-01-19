import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { axiosGet } from "../axios";

//  Styled
const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
  margin-top: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;
const Productparent = styled.div`
  width: 100%;
  max-width: 1024px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const ProductHead = styled.h5`
  text-align: center;
  padding: 10px 0px;
  font-family: "Kanit";
  color: black;
`;
const PdetailSection = styled.div`
  width: 100%;
  height: 40vh;
  background-color: white;
  align-self: center;
  display: flex;
  border-radius: 5px;
`;
const PImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  object-position: center;
  justify-self: center;
  align-self: center;
`;
const PDetails = styled.div`
  flex: 2;
  padding: 10px 20px;
`;
const PSummary = styled.div`
  width: 100%;
  align-self: center;
  height: 50vh;
  overflow-y: scroll;
  color: black;
  font-family: sans-serif;
  padding: 0px 20px;
`;
const Previews = styled.div``;
const Span = styled.span`
  color: black;
  padding: 0px 10px;
  font-family: sans-serif;
  display: block;
  margin: 10px 0px;
`;

export const Product = () => {
  let productId = location.href.split("/")[4];
  const [product, setProduct] = useState([]);
  console.log(product);
  const GetProduct = async () => {
    const res = await axiosGet(`food/productopen/${productId}`);
    if (res.data) {
      setProduct(res.data);
    }
  };
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <>
      <ProductContainer>
        <Productparent>
          <ProductHead>Product Details Are here </ProductHead>
          <PdetailSection>
            <PImage>
              <Image src={product.src} alt="Image not Found" />
            </PImage>
            <PDetails>
              <ProductHead style={{ textAlign: "left" }}>
                {product.name}
              </ProductHead>
              <Span>{product.food}</Span>
              <Span>
                <strong style={{ color: "black" }}>Type:-</strong>{" "}
                {product.foodType}
              </Span>
            </PDetails>
          </PdetailSection>
          <PSummary>
            <h5
              style={{
                textAlign: "center",
                margin: "5px 0px ",
                color: "black",
              }}
            >
              Product Summary{" "}
            </h5>
            {product.desc}
          </PSummary>
          <Previews></Previews>
        </Productparent>
      </ProductContainer>
    </>
  );
};
