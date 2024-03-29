"use client";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa";

const styles = StyleSheet.create({
  totalText: {
    fontWeight: "semibold",
    fontSize: "10px",
    color: "black",
  },
});

const OrderInvoice = ({ products }) => {
  const formatDate = () => {
    const date = new Date();
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  // Calculate total price for each product
  const calculateTotalPrice = (quantity, product_price) =>
    quantity * product_price;

  // Calculate overall total price for all products
  const calculateOverallTotal = () => {
    return products?.order_products?.reduce((total, product) => {
      const productTotal = calculateTotalPrice(
        product.product_quantity,
        product.product_price
      );
      return total + productTotal;
    }, 0);
  };
  const document = (
    <Document>
      <Page size={"A4"}>
        <View style={{ margin: "10px" }}>
          {/* to header */}
          <View style={{ marginBottom: "20px" }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "24px",
                margin: "20px 0",
                letterSpacing: "1px",
              }}
            >
              Janani Computers
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 10, fontWeight: "bold", width: "80px" }}
                  >
                    Date
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    : {formatDate(products?.createdAt)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Order-ID
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.order_id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Transaction-ID
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.transaction_id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Payment Status
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.payment_status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Method
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.payment_method}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Order Status
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.order_status}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 10, fontWeight: "bold", width: "80px" }}
                  >
                    Name
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    : {products?.customer_id?.user_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Contact-no
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.customer_phone}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Division
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.division}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    District
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.district}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    City
                  </Text>
                  <Text style={{ fontSize: "10px" }}>: {products?.city}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "80px",
                    }}
                  >
                    Delivery Method
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    : {products?.delivery_method}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            {/* Column Headers */}
            <View
              style={{
                flexDirection: "row",
                borderTop: "1px",
                borderLeft: "1px",
                borderRight: "1px",
                borderBottom: "1px",
                padding: "10px 0",
                backgroundColor: "#000F24",
                borderColor: "#F5F7F8",
                color: "white",
              }}
            >
              <View
                style={{
                  width: "50px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "0 5px",
                }}
              >
                <Text>#SL</Text>
              </View>
              <View
                style={{ width: "280px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Product</Text>
              </View>
              <View
                style={{ width: "50px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Price</Text>
              </View>
              <View
                style={{ width: "40px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>QTY</Text>
              </View>
              <View
                style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Product SKU</Text>
              </View>
              <View
                style={{ width: "50px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Brand</Text>
              </View>
            </View>

            {/* Data Row */}
            {products?.order_products?.map((product, i) => (
              <View
                key={product?.productId}
                style={{
                  flexDirection: "row",
                  borderBottom: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  padding: "10px 0",
                  borderColor: "#F5F7F8",
                  backgroundColor: i % 2 === 0 ? "#F5F7F8" : "white",
                }}
              >
                <View
                  style={{
                    width: "50px",
                    fontSize: "10px",
                    textAlign: "left",
                    paddingLeft: "10px",
                  }}
                >
                  <Text>{i + 1}</Text>
                </View>
                <View style={{ width: "280px" }}>
                  <Text style={styles.totalText}>{product?.product_name}</Text>
                </View>
                <View style={{ width: "50px" }}>
                  <Text style={styles.totalText}>{product?.product_price}</Text>
                </View>
                <View style={{ width: "40px" }}>
                  <Text style={styles.totalText}>
                    {product?.product_quantity}
                  </Text>
                </View>
                <View style={{ width: "80px" }}>
                  <Text style={styles.totalText}>
                    {product?.product_id?.product_sku}
                  </Text>
                </View>
                <View style={{ width: "50px", fontSize: "10px" }}>
                  <Text style={styles.totalText}>
                    {product?.product_id?.product_brand_id?.brand_name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTop: "1px",
              borderLeft: "1px",
              borderRight: "1px",
              borderBottom: "1px",
              borderColor: "#F5F7F8",
              padding: "10px 0",
            }}
          >
            <View
              style={{
                width: "80px",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              <Text></Text>
            </View>
            <View style={{ width: "200px" }}>
              <Text></Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text></Text>
            </View>
            <View
              style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text></Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>Sub Total</Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>{calculateOverallTotal()}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTop: "1px",
              borderLeft: "1px",
              borderRight: "1px",
              borderBottom: "1px",
              borderColor: "#F5F7F8",
              padding: "10px 0",
            }}
          >
            <View
              style={{
                width: "80px",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              <Text></Text>
            </View>
            <View style={{ width: "200px" }}>
              <Text></Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text></Text>
            </View>
            <View
              style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text></Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>Discount</Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>
                {products?.coupon_id ? (
                  <>
                    {products.coupon_id.coupon_amount}
                    {products.coupon_id.coupon_type === "fixed" ? " tk" : " %"}
                  </>
                ) : (
                  0
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTop: "1px",
              borderLeft: "1px",
              borderRight: "1px",
              borderBottom: "1px",
              borderColor: "#F5F7F8",
              padding: "10px 0",
            }}
          >
            <View
              style={{
                width: "80px",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              <Text></Text>
            </View>
            <View style={{ width: "200px" }}>
              <Text></Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text></Text>
            </View>
            <View
              style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text></Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>Dalivery Charge</Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>{products?.delivery_charge}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTop: "1px",
              borderLeft: "1px",
              borderRight: "1px",
              borderBottom: "1px",
              borderColor: "#F5F7F8",
              padding: "10px 0",
            }}
          >
            <View
              style={{
                width: "80px",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              <Text></Text>
            </View>
            <View style={{ width: "200px" }}>
              <Text></Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text></Text>
            </View>
            <View
              style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text></Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>Total</Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>{products?.total_price}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={document} fileName="invoice">
        {({ loading }) =>
          loading ? (
            <button className="flex flex-col items-center py-[2px] group px-1 rounded-md bg-primaryColor">
              <FaDownload className="text-xl text-textColor group-hover:text-secondary" />
              <span className="text-[10px] text-textColor">Download</span>
            </button>
          ) : (
            <button className="flex flex-col items-center py-[2px] group px-1 rounded-md bg-primaryColor">
              <FaDownload className="text-xl text-textColor group-hover:text-secondary" />
              <span className="text-[10px] text-textColor">Download</span>
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default OrderInvoice;
