import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Cart, Discount } from "models/models";
import { Company } from "models/company";
import { acumular, formatDate } from "functions/functios";
import { getCompanies } from "functions/company";
import { CartClass } from "functions/api";


// Define estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
  head: {
    borderBottom: '1 solid black',
  },
  total: {
    fontSize: 25,
    fontStyle: 'bold',
    marginBottom: 10,
    textAlign: 'right'
  },
  img: {
    textAlign: 'right',
    width: '70px',
    height: '70px',
    alignContent: 'center',
  }
});


interface ComprobanteVentaProps {
  cart: Cart.cart;
}


const ComprobanteVentaPDF: React.FC<ComprobanteVentaProps> = ({ cart }) => {
  const [discount, setdiscount] = useState<Discount.dicountsResponse[]>();
  const [tcart, settcart] = useState<Cart.cart>();
  const [company, setcompany] = useState<Company>();

  useEffect(() => {
    getCompanies().then(
      c => {
        setcompany(c);
      }
    )
  }, [])

  useEffect(() => {
    Actualizar(cart.id);
  }, [cart.id])

  const Actualizar = (idCartParam: number) => {
    if (idCartParam) {
      CartClass.getCart(idCartParam)
        .then(myCart => {
          if (myCart) {
            settcart(myCart);

          }

        })
        .catch(err => {
          console.error(err);
        })
      CartClass.discountsForCart(idCartParam).then(dis => {
        setdiscount(dis);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const formatPrice = (price: number) => {
    // Convierte el precio a un número de punto flotante y redondea a 2 decimales
    const formattedPrice = (price).toFixed(2);

    // Divide el precio en partes enteras y decimales
    const [integerPart, decimalPart] = formattedPrice.split('.');

    // Agrega comas para separar los miles en la parte entera
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Retorna el precio formateado con el símbolo de la moneda (por ejemplo, $ para dólares)
    return `$${integerWithCommas}.${decimalPart}`;
  };

  return (
    <Document author='aRamirez'>
      <Page size="A4" style={styles.page}>
        <View style={styles.head}>
        <View style={styles.row}>
          <Image style={styles.img} src={company?.logo} />
        </View>
        <View style={styles.row}>
          <View style={styles.header}>
            <Text style={styles.title}>Comprobante de Venta</Text>
            <Text style={styles.subtitle}>ID de Venta: {cart.id}</Text>
            <Text style={styles.subtitle}>Fecha: {formatDate(cart.cartDate)}</Text>
            <Text style={styles.subtitle}>Cajero: {cart.user.id} - {cart.user.name}</Text>
          </View>
          <View style={styles.header}>
            <Text>{company?.name}</Text>
            <Text>{company?.cuil}</Text>
            <Text>{company?.phone}</Text>
            <Text>{company?.address}</Text>
            <Text>{company?.email}</Text>
          </View>
        </View>
        </View>
        

        <View style={styles.section}>
          <Text style={styles.subtitle}>Detalle de la venta:</Text>
          {tcart && tcart.sales.map((item, index) => (
            <Text key={index} style={styles.content}>
              - {item.product.kind ? `${item.quantity} g de ` : `${item.quantity} x `} {item.product.name} - Precio unitario: {formatPrice(item.product.price)} - Subtotal: {formatPrice(item.quantity * item.product.price)}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Descuentos:</Text>
          {discount && discount.map((item, index) => (
            <Text key={index} style={styles.content}>
              {item.discountName} - {item.productName} - Subtotal: {formatPrice(item.discount)}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.total}>Total: {tcart?.sales && formatPrice(acumular(tcart?.sales, discount))}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ComprobanteVentaPDF;