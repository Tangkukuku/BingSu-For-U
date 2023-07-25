import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import {prisma} from "../../lib/prisma";
import {Prisma, Menu, Table, User} from "@prisma/client";
import {AllService} from "../../demo/service/AllService";
import Decimal from "decimal.js";
import {A} from "@fullcalendar/core/internal-common";
import Head from "next/head";
import {Dialog} from 'primereact/dialog';
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {any, bool} from "prop-types";
import Image from "next/image";

type Props = {
    menus: Menu[],
}

interface cart {
    name: any;
    price: any;
    quantity: any;
}

const Shop = (props: Props) => {
    const [cartItems, setCartItems] = useState<cart[]>([]);
    let [menus, setMenus] = useState<Menu[]>(props.menus);
    const [visible, setVisible] = useState(false);

    const hideDialog = () => {
        setVisible(false)
    }

    const dialogCheckout = () => {
        return (

            <div  style={{height:"100%",width:"20%",backgroundColor:"black"}}>
                asd
            </div>


            // <Dialog visible={visible} onHide={hideDialog}  className="dialogMenu">
            //     <div className="">
            //         {menus.map(menu =>
            //             <div>
            //                 {menu.quantity && menu.quantity > 0 && (
            //                     <>
            //                         <div>
            //                             {menu.nameFood}  {menu.quantity}
            //                         </div>
            //                         {/*<div className="product">*/}
            //                         {/*    /!*<img className="product-image" src="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" alt="" />*!/*/}
            //                         {/*    <img src="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" className="image-product" alt=""/>*/}
            //                         {/*    <h3>{menu.nameFood}</h3>*/}
            //                         {/*    <div>{menu.price + ""} ฿</div>*/}
            //
            //                         {/*    <div>*/}
            //                         {/*        <button className="quantity-button" onClick={e => minusQuantity(menu)}>-</button>*/}
            //                         {/*        <span>  {menu.quantity ? menu.quantity : 0}  </span>*/}
            //                         {/*        <button className="quantity-button" onClick={e => plusQuantity(menu)}>+</button>*/}
            //                         {/*        <button className="snipcart-add-item" data-item-id="62414313" data-item-image="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" data-item-name="Wallet" data-item-url="/" data-item-price="19.99">Add to Cart</button>*/}
            //                         {/*    </div>*/}
            //                         {/*</div>*/}
            //                     </>
            //                 )}
            //             </div>
            //
            //
            //
            //
            //         )}
            //     </div>
            // </Dialog>
        )
    }
    const plusQuantity = (item: Menu) => {
        for (let menu of menus) {
            if (menu.menuCode === item.menuCode) {
                menu.quantity = item.quantity ? item.quantity + 1 : 1;
                break
            }
        }
        setMenus([...menus])
    }
    const minusQuantity = (item: Menu) => {
        for (let menu of menus) {
            if (menu.menuCode === item.menuCode) {
                menu.quantity = item.quantity ? item.quantity - 1 : 0;
                break
            }
        }
        setMenus([...menus])
    }
    return (
        <div className="shop">
            <Head>
                <link rel="stylesheet" href="/styles/layout/_poc.scss"/>
                {/*<link rel="stylesheet" href="/styles/layout/_topbar.scss"/>*/}
                <title>BingSu For U</title>
            </Head>
            <Button onClick={() => setVisible(true)} style={{marginBottom: "1%"}}>ตรวจจสอบรายการอาหาร</Button>
            <div>
                <div className="gridMenu">
                    {menus.map(menu => (
                        <>
                            {/*{menu.nameFood}*/}


                            <div className="product">
                                {/*<img className="product-image" src="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" alt="" />*/}
                                <img src="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" className="image-product" alt=""/>
                                <div className="headMenu">{menu.nameFood}</div>
                                <div>{menu.price + ""} ฿</div>

                                <div>
                                    <button className="quantity-button" onClick={e => minusQuantity(menu)}>-</button>
                                    <span>  {menu.quantity ? menu.quantity : 0}  </span>
                                    <button className="quantity-button" onClick={e => plusQuantity(menu)}>+</button>
                                    {/*<button className="snipcart-add-item" data-item-id="62414313" data-item-image="https://www.datocms-assets.com/56262/1633338869-fancy-wallet.jpg" data-item-name="Wallet" data-item-url="/" data-item-price="19.99">Add to Cart</button>*/}
                                </div>
                            </div>
                        </>

                    ))}
                </div>
                <div  style={{height:"100%",width:"20%",backgroundColor:"black"}}>
                    asd
                </div>
                {/*{dialogCheckout()}*/}
            </div>



        </div>
    );
};

export default Shop;

//
// const Menu = ({nameFood, price}:any) => {
//     const [quantity, setQuantity] = useState(0);
//
//     const handleIncreaseQuantity = () => {
//         setQuantity(quantity + 1);
//     };
//
//     const handleDecreaseQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };
//
//     return (
//         // <div className="product">
//         //     <div className="product-image-container">
//         //         <img className="product-image" src={"https://via.placeholder.com/100x100.png?text=Product+2"} alt={name}/>
//         //     </div>
//         //     <div className="product-info">
//         //         <h3 className="product-name">{name}</h3>
//         //         <p className="product-price">{price}฿</p>
//         //         <div className="product-quantity">
//         //             <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
//         //             <span className="quantity">{quantity}</span>
//         //             <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
//         //         </div>
//         //         <button className="add-to-cart-button">Add to Cart</button>
//         //     </div>
//         // </div>
//         <div className="product-container">
//
//             <div className="product" >
//                 <div className="product-image-container">
//                     <img className="product-image" src={"https://via.placeholder.com/100x100.png?text=Product+2"} alt={nameFood} />
//                 </div>
//                 <div className="product-info">
//                     <h3 className="product-name">{nameFood}</h3>
//                     <p className="product-price">{price}฿</p>
//                     <div className="product-quantity">
//                         <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
//                         <span className="quantity">{quantity}</span>
//                         <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
//                     </div>
//                     <button className="add-to-cart-button">Add to Cart</button>
//                 </div>
//             </div>
//
//         </div>
//
//
//
//     );
//
// }
//
// const Product = ({ name, price, imageUrl, onAddToCart }:any) => {
//     const [quantity, setQuantity] = useState(1);
//
//     const handleAddToCart = () => {
//         onAddToCart({ name, price, quantity });
//     };
//
//     const handleIncreaseQuantity = () => {
//         setQuantity(quantity + 1);
//         onAddToCart({ name, price, quantity,true:bool });
//     };
//
//     const handleDecreaseQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//             onAddToCart({ name, price, quantity,false:bool });
//         }
//     };
//
//     return (
//         <div className="product">
//             <img className="product-image" src={imageUrl} alt={name} />
//             <h2 className="product-name">{name}</h2>
//             <p className="product-price">${price.toFixed(2)}</p>
//             <div className="product-quantity">
//                 <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
//                 <span className="quantity">{quantity}</span>
//                 <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
//             </div>
//             <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };
//
// const CartItem = ({ name, price, quantity,plusminus, onRemoveFromCart }:any) => {
//     const handleRemoveFromCart = () => {
//         onRemoveFromCart({ name, price, quantity });
//     };
//
//     return (
//         <div className="cart-item">
//             <h3 className="cart-item-name">{name}</h3>
//             <p className="cart-item-price">${(price * quantity).toFixed(2)}</p>
//             <p className="cart-item-quantity">Quantity: {plusminus ? quantity+1:quantity-1} {plusminus}</p>
//             <button className="remove-from-cart-button" onClick={handleRemoveFromCart}>Remove</button>
//         </div>
//     );
// };
//
// const Checkout = ({ cartItems, onCheckout }:any) => {
//     const total = cartItems.reduce((acc:any, { price, quantity }:any) => acc + price * quantity, 0);
//     const [visible, setVisible] = useState(true);
//     const hideDialog = () => {
//         setVisible(false);
//     };
//     const handleCheckout = () => {
//         onCheckout();
//     };
//
//     return (
//         <div className="checkout">
//             <h2 className="checkout-title">Checkout</h2>
//             {/*{cartItems.map((item: { name: any; price: any; quantity: any; }) => (*/}
//             {/*    <CartItem*/}
//             {/*        key={item.name}*/}
//             {/*        name={item.name}*/}
//             {/*        price={item.price}*/}
//             {/*        quantity={item.quantity}*/}
//             {/*        onRemoveFromCart={onCheckout}*/}
//             {/*    />*/}
//             {/*))}*/}
//             <h3 className="checkout-total">Total: ${total.toFixed(2)}</h3>
//             <button className="checkout-button" onClick={handleCheckout}>ยืนยันรายการอาหร</button>
//
//         </div>
//     );
// };
//
// const Shop = (props:Props) => {
//     const [cartItems, setCartItems] = useState<{ name: any; price: any; quantity: any;plusMinus:any;}[]>([]);
//     const [visible, setVisible] = useState(false);
//     const hideDialog = () => {
//         setVisible(false);
//     };
//     const handleAddToCart = (item: any) => {
//         const filteredCartItems = cartItems.filter((i: { name: any; price: any; quantity: any;plusMinus:any; }) => i.name !== item.name)
//
//         setCartItems([...filteredCartItems, item]);
//     };
//
//     const handleRemoveFromCart = (item: any) => {
//         setCartItems(cartItems.filter(i => i !== item));
//     };
//
//     const handleCheckout = () => {
//         alert('Thank you for your purchase!');
//         setCartItems([]);
//     };
//
//     const dialogCheckout = () => {
//         return (
//             // <Dialog visible={visible} onHide={hideDialog} style={{width: "50%",height: "auto"}}>
//             //     <div className="cart">
//             //         {cartItems.length === 0 ? (
//             //             <p>Your cart is empty.</p>
//             //         ) : (
//             //             <>
//             //                 <h2>Cart</h2>
//             //                 {cartItems.map((item: { name: any; price: any; quantity: any; }) => (
//             //                     <CartItem
//             //                         key={item.name}
//             //                         name={item.name}
//             //                         price={item.price}
//             //                         quantity={item.quantity}
//             //                         onRemoveFromCart={() => handleRemoveFromCart(item)}
//             //                     />
//             //                 ))}
//             //                 <div style={{width:"auto",backgroundColor:"red"}} className="bar"> <Checkout cartItems={cartItems} onCheckout={handleCheckout} /></div>
//             //
//             //             </>
//             //         )}
//             //     </div>
//             // </Dialog>
//             <Dialog visible={visible} onHide={hideDialog} style={{width: "20%",height: "50%"}}>
//                 <div className="cart">
//                     {cartItems.length === 0 ? (
//                         <p>Your cart is empty.</p>
//                     ) : (
//                         <>
//                             <h2>Cart</h2>
//                             {cartItems.map((item: { name: any; price: any; quantity: any;plusMinus:any; }) => (
//                                 <CartItem
//                                     key={item.name}
//                                     name={item.name}
//                                     price={item.price}
//                                     quantity={item.quantity}
//                                     plusminus={item.plusMinus}
//                                     onRemoveFromCart={() => handleRemoveFromCart(item)}
//                                 />
//                             ))}
//                             <div >
//                                 <Checkout cartItems={cartItems} onCheckout={handleCheckout} />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </Dialog>
//         )
//     }
//     return (
//         <div className="shop">
//             <Head>
//                 <link rel="stylesheet" href="/styles/layout/_poc.scss"/>
//                 <link rel="stylesheet" href="/styles/layout/_topbar.scss.scss"/>
//                 <title>BingSu For U</title>
//             </Head>
//             <Button onClick={() => setVisible(true)}style={{marginBottom:"1%"}} >ตรวจจสอบรายการอาหาร</Button>
//             <div className="products">
//                 {props.menus.map((menu) =>(
//                     <div>
//                         <Product
//                             name={menu.nameFood}
//                             price={Number(menu.price)}
//                             imageUrl="https://via.placeholder.com/100x100.png?text=Product+1"
//                             onAddToCart={handleAddToCart}
//                         />
//                     </div>
//
//                     ))}
//             </div>
//
//             {dialogCheckout()}
//         </div>
//     );
// };
//
// export default Shop;

export const getServerSideProps: GetServerSideProps = async (context) => {

    let data = await prisma.menu.findMany({
        select: {
            id: true,
            menuCode: true,
            nameFood: true,
            price: true,
            statusMenu: true,
            category: true,
            number: true,
        }
    })
    const menus = data.map(menu => {
        const price = new Decimal(menu.price ? menu.price : 0);
        return {
            ...menu,
            price: price.toString()
        };
    });
    return {
        props: {
            menus: menus
        },
    };
}


