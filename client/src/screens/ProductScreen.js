import "./ProductScreen.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';


//Actions 
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";


const ProductScreen = () => {

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.getProductDetails);
    const { loading, error, product } = productDetails;
    const navigate = useNavigate();
    useEffect(() => {

        if (product && id !== product.id) {
            dispatch(getProductDetails(id));
        }
    }, []);

    const addToCardHandler = () => {
        dispatch(addToCart(product.id, qty));
        navigate("/cart");
    };

    return <div className="productscreen">
        {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : (
            <>

                <div className="productscreen_left">
                    <div className="left_img">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="left_info">
                        <p className="left_name">{product.title} </p>
                        <p >Price: ${product.price} </p>
                        <p >Description : {product.description} </p>
                    </div>
                </div>
                <div className="productscreen_right">
                    <div className="right_info">
                        <p>
                            Price: <span>${product.price}</span>
                        </p>
                        <p>
                            Status:{" "}
                            <span>
                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>
                        <p>
                            Qty
                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map((x) =>
                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                )}
                            </select>
                        </p>
                        <p>
                            <button type="button" onClick={addToCardHandler}>Add to Cart</button>
                        </p>
                    </div>
                </div>
            </>
        )}
    </div>

}

export default ProductScreen