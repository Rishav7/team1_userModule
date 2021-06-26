import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
//import products from "../products";
import Product from '../components/Product';
//importing useDispatch for lading the data in the homeScreen
import { useDispatch, useSelector } from 'react-redux';
//importing action for lading the data in the homeScreen
// import { listProducts } from '../actions/productActions';

import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  //we are destructuring from  the productList and pull out
  const { loading, error, products } = productList;

  

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products && products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
