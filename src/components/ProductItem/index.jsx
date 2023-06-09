import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import moneyFormat from "../../utils/moneyFormat.js";

const cx = classNames.bind(styles);
function ProductItem({ data, searchResultPage, preview }) {
   // console.log("products = ", data);

   const featureText = data.feature || data.featureText || '';
   const features = featureText
      ? featureText.slice(0, featureText.length - 5).split("*and*")
      : "";

   return (
      <div className={cx("col", searchResultPage ? "col-3" : preview ? "col-9" : "col-4")}>
         <div className={cx("product-item")}>
            {/* preview in dashboard */}
            {preview ? (
               <div className={cx("product-item-frame")}>
                  <img
                     className={cx("product-item-image")}
                     src={
                        data?.image_path
                           ? data.image_path
                           : "https://placehold.co/300X400"
                     }
                  />
                  {!!data?.product_label && (
                     <img
                        className={cx("product-item-label")}
                        src={data.product_label}
                     />
                  )}
               </div>
            ) : (
               <Link
                  to={`/${data.category}/${data.href}`}
                  className={cx("product-item-frame")}
               >
                  <img
                     className={cx("product-item-image")}
                     src={
                        data.image_path?.includes(".jpg")
                           ? data.image_path
                           : "https://placehold.co/300X400"
                     }
                  />
                  {!!data.product_label && (
                     <img
                        className={cx("product-item-label")}
                        src={data.product_label}
                     />
                  )}
               </Link>
            )}

            <div className={cx("product-item-event")}>
               {data?.label && (
                  <span className={cx("event-label")}>{data.label}</span>
               )}
            </div>
            {data?.intallment && (
               <div className={cx("product-item-installment")}>
                  <span>Trả góp 0%</span>
               </div>
            )}
            <div className={cx("product-item-body")}>
               <h4 className={cx("product-item_name")}>{data?.name || "Example"}</h4>

               <div className={cx("product-item_tags")}>
                  {!!features &&
                     features.map((tag, index) => (
                        <p key={index} className={cx("tag")}>
                           {tag}
                        </p>
                     ))}
               </div>
               {/* {data.category === 'dtdd' && (
                                 <div className={cx('product-item-memory')}>
                                    <button
                                       className={cx('memory-item', 'active')}
                                    >
                                       64GB
                                    </button>
                                    <button className={cx('memory-item')}>
                                       128GB
                                    </button>
                                 </div>
                              )} */}
               {/* <div className={cx('gift')}>
                                 {!!data.gift && <span>{data.gift}</span>}
                              </div> */}
               <div className={cx("product-item_price")}>
                  <div className={cx("price-top")}>
                     {data?.old_price && data?.old_price > data.cur_price && (
                        <>
                           <span className={cx("product-item_price--old") }>
                              {data.old_price && moneyFormat(data.old_price) + "₫"}
                           </span>
                           <span className={cx("discount-percent")}>
                              -
                              {(
                                 ((data.old_price - data.cur_price) /
                                    data.old_price) *
                                 100
                              ).toFixed(0)}
                              %
                           </span>
                        </>
                     )}
                  </div>

                  <h1 className={cx("product-item_price--current")}>
                     {data?.cur_price ? moneyFormat(data?.cur_price) : moneyFormat("12345")}
                     ₫
                  </h1>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductItem;
