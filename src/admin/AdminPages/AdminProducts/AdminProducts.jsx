import "./AdminProducts.css";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { axiosPost, deleteaxios, imageurl } from "../../../axios";
import { Nav } from "../Components/LeftSlid/Nav";
import { UpdateProduct } from "../updateProduct/UpdateProduct";
import { AddProduct } from "../AddProduct/AddProduct";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [cookies] = useCookies(["jwt"]);
  const [totalproducts, setTotalproducts] = useState(0);

  // ref use here
  const hasMounted = useRef(false);

  //  search All Products
  const getAllProducts = useCallback(
    async (pageNumber, pageSize, searchItem) => {
      const res = await axiosPost(
        "lakhdatar/admin/getAllproduct",
        { pageNumber, pageSize, searchItem },
        cookies.jwt
      );
      if (res.data) {
        setProducts(res.data.data.products);
        setTotalproducts(res.data.data.totalproduct);
        // setTotalproducts(res.data.data.totalProduct);
      }
      if (res.response.data.message) {
        toast.error(res.response.data.message);
      }
    },
    [cookies.jwt, currentPage, pageSize, searchItem]
  );

  // fetch data of getallProducts
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true; // After first render, set to true
      return; // Skip the first render
    }
    getAllProducts(currentPage, pageSize, searchItem);
  }, [getAllProducts, currentPage, pageSize, searchItem]);

  // handleUpdate function
  const handleUpdate = () => {
    setSelectedProduct(null);
    getAllProducts(); // Re-fetch after update
  };

  // handle close updatebtn
  const handleCloseUpdate = () => {
    setSelectedProduct(null); // Not false
  };

  const handleAddProduct = () => {
    setIsAdd(true);
  };

  // function for delete product
  async function handleDelete(e, id) {
    e.preventDefault();
    const res = await deleteaxios(
      `lakhdatar/admin/deleteproduct/${id}`,
      cookies.jwt
    ).catch((error) => {
      toast(error?.response.data.message);
    });
    if (res) {
      toast.success(res);
      getAllProducts();
    }
  }

  //  change pageNumber of pagination
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  });

  //  handle page size
  async function handlepagesize(e, size) {
    e.preventDefault();
    setPageSize(size);
  }

  // here we are using search filter
  async function searchProducts(e, value) {
    e.preventDefault();
    setSearchItem(value);
  }

  return (
    <div className="home-container">
      <Nav />
      <div className="rightdata">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search Food"
            onChange={(e) => {
              searchProducts(e, e.target.value);
            }}
          />

          <button className="search-btn" disabled={products.length == 0}>
            Search
          </button>
          <button className="add-new-product" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
        <div className="users-table-container">
          <div className="table-wrapper">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Full Price</th>
                  <th>Half Price</th>
                  <th>Food Type</th>
                  <th>Update Product</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((prod) => (
                    <tr key={prod._id}>
                      <td className="img-parent">
                        <img
                          src={`${imageurl}${prod.src}`}
                          alt="img Not Found"
                          className="produt-image"
                          loading="lazy"
                        />
                        <span className="edit-btn">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </span>
                      </td>
                      <td className="product-name">{prod.name}</td>
                      <td>{prod.fullprice}</td>
                      <td>{prod.halfprice}</td>
                      <td>{prod.foodType}</td>
                      <td>
                        <button
                          className="update-btn"
                          onClick={() => setSelectedProduct(prod)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            handleDelete(e, prod._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="no-product-container">
                    <span className="no-products">No Products Available </span>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalproducts.length !== 0 && (
          <div className="pagination">
            <span>
              Showing {currentPage} to {Math.min(10, products.length)} of-
              {pageSize} results
            </span>
            <div className="pagination-buttons">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(10).keys()].map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={currentPage === pageNumber + 1 ? "active" : ""}
                >
                  {pageNumber + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === 10}
              >
                Next
              </button>
              <span style={{ color: "black" }} className="pagination-head">
                Rows Per Page
              </span>
              <select
                name=""
                id=""
                className="pagination-pagesize"
                onChange={(e) => handlepagesize(e, e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Render UpdateProduct if a product is selected */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onUpdate={handleUpdate}
          onClose={handleCloseUpdate}
        />
      )}

      {/* Render AddProduct if isAdd is true */}
      {isAdd && (
        <AddProduct setisAdd={setIsAdd} getAllProducts={getAllProducts} />
      )}
    </div>
  );
};

export default AdminProducts;
