"use client";
import { numberWithCommas } from "@/utils/thousandSeparate";
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

const InvoicePdf = ({ products }) => {
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
    return products.reduce((total, product) => {
      const productTotal = calculateTotalPrice(
        product.quantity,
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
            <Text style={{ fontSize: "10px", textAlign: "center" }}>
              Janani Computers Limited Kusholi Bhaban, 238/1 Begum Rokeya
              Sarani, Taltola, Dhaka-1207, Bangladesh,
            </Text>
            <Text style={{ fontSize: "10px", textAlign: "center" }}>
              +8801796682951, +8801796682951, info@janani.com
            </Text>
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
                  width: "80px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "0 5px",
                }}
              >
                <Text>#SL</Text>
              </View>
              <View
                style={{ width: "200px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Category</Text>
              </View>
              <View
                style={{ width: "100%", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Product</Text>
              </View>
              <View
                style={{ width: "80px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>QTY</Text>
              </View>
              <View
                style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Unit Price</Text>
              </View>
              <View
                style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
              >
                <Text>Total</Text>
              </View>
            </View>

            {/* Data Row */}
            {products?.map((product, i) => (
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
                    width: "80px",
                    fontSize: "10px",
                    textAlign: "left",
                    paddingLeft: "10px",
                  }}
                >
                  <Text>{i + 1}</Text>
                </View>
                <View style={{ width: "200px", fontSize: "10px" }}>
                  <Text style={styles.totalText}>
                    {product.pc_builder_name}
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.totalText}>{product.product_name}</Text>
                </View>
                <View style={{ width: "80px" }}>
                  <Text style={styles.totalText}>{product.quantity}</Text>
                </View>
                <View style={{ width: "100px", fontSize: "10px" }}>
                  <Text style={styles.totalText}>
                    {numberWithCommas(product.product_price)}
                  </Text>
                </View>
                <View style={{ width: "100px", fontSize: "10px" }}>
                  <Text style={styles.totalText}>
                    {numberWithCommas(
                      product?.quantity * product.product_price
                    )}
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
              <Text>Total</Text>
            </View>
            <View
              style={{ width: "100px", fontSize: "10px", fontWeight: "bold" }}
            >
              <Text>{numberWithCommas(calculateOverallTotal())}</Text>
            </View>
          </View>
          <View style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Text style={{ fontSize: "10px", textAlign: "left" }}>
              All information generated from jananicomputer.com at{" "}
              {formatDate()}
            </Text>
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

export default InvoicePdf;
