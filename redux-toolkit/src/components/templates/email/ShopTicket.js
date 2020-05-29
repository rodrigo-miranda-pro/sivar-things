import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
export default (props) =>{
    const theme = useTheme();
    const {products, totalPrice, selectedClient, payment, idord} = props;
    const primaryColor = "#6c9587";
    const cls = {
        fieldName:{
            fontWeight: 'bold',
            fontSize: '1.25em',
        },
        fieldValue:{
            fontSize: '1.25em',
            color: primaryColor,
        },
        textCenter:{
            textAlign: "center"
        },
        title:{
            color: primaryColor,
            lineHeight: 0,
            fontSize: '2em',
        },               
        tableDetail:{margin: 0},
        products:{width: "100%"},
        product:{
            padding: "0 0 8px 16px",
            fontSize: '1.25em',
            fontWeight: 'bold',
        },
        productname:{
            padding: "0 24px 0 0",
            fontSize: '1em',
            textAlign: "left"
        },
        category:{
            fontSize: '0.85em',
            color: "#777",
            fontWeight: 'normal',
        },
        price:{
            fontSize: '1.5em',
            textAlign: 'right',
        },
        borderTopDashed:{
            borderTop: '1px dashed #ccc',
        },
        borderTopDouble:{
            borderTop: '4px double #ccc',
        },
        cargoEnvio:{
            color: primaryColor,
            fontSize: '1.5em',
            textAlign: 'right',          
            borderTop: '1px dashed #ccc',  
        },
        fontSize2em:{
            fontSize: "2em"
        },
        total:{
            color: "#f44336",
            textAlign: 'right',            
        },
        lineHeight8px:{
            lineHeight: "8px"
        },
        fontWeightNormal:{
            fontWeight: "normal"
        },
        table:{
            margin: 'auto',
            borderCollapse: 'separate',
            borderSpacing: '0px',
        },
        table_td:{
            textAlign: 'left',
            padding: "4px 16px"
        }        
    }
    const Header = (
        <>
            <h2 style={{...cls.textCenter, ...cls.title}}>{"Orden #" + idord}</h2>
        </>
    )
    const DatosEnvio = (
        <>
            <h2>{"Datos de Envio"}</h2>
            <table style={{ ...cls.table, ...cls.tableDetail}}>
                <tr>
                    <td style={{...cls.table_td, ...cls.fieldName}}>{"Nombre"}</td>
                    <td style={{...cls.table_td, ...cls.fieldValue}}>{selectedClient.name}</td>
                </tr>
                <tr>
                    <td style={{...cls.table_td, ...cls.fieldName}}>{"Correo"}</td>
                    <td style={{...cls.table_td, ...cls.fieldValue}}>{selectedClient.email}</td>
                </tr>
                <tr>
                    <td style={{...cls.table_td, ...cls.fieldName}}>{"Telefono"}</td>
                    <td style={{...cls.table_td, ...cls.fieldValue}}>{selectedClient.phonenumber}</td>
                </tr>
                <tr>
                    <td style={{...cls.table_td, ...cls.fieldName}}>{"Dirección"}</td>
                    <td style={{...cls.table_td, ...cls.fieldValue}}>{selectedClient.direction}</td>
                </tr>
            </table>
        </>
    )
    const InformacionPago = (
        <>
            <h2>{"Informacion de Pago"}</h2>
            <table style={{ ...cls.table, ...cls.tableDetail}}>
                <tr>
                    <td style={{...cls.table_td, ...cls.fieldName}}>{"Forma de Pago"}</td>
                    <td style={{...cls.table_td, ...cls.fieldValue}}>{payment.method === "efective"?"Efectivo": "Tarjeta de Credito"}</td>
                </tr>
            </table>
        </>
    )
    const Productos = (
        <>
            <h2>{"Productos"}</h2>
            <table style={{...cls.tableDetail, ...cls.products}}>
            {products && products.map((p, i) => 
                <tr key={"tr-" + i}>
                    <td style={{...cls.table_td, ...cls.product}}>
                        <div style={cls.productname}>{p.nombre}</div>
                        <div style={cls.category}>{`${p.categoria} - ${p.opcion}`}</div>
                    </td>
                    <td style={{...cls.table_td, ...cls.price}}>{"$"+p.precio}</td>
                </tr>
            )}
                <tr key={"tr-ce"}>
                    <td style={{...cls.table_td, ...cls.cargoEnvio}}>
                        <div style={cls.productname}>{"Cargo por envío"}</div>
                    </td>
                    <td style={{...cls.table_td, ...cls.cargoEnvio}}>{`$${process.env.API_CARGO_ENVIO}`}</td>
                </tr>
                <tr key={"tr-tt"} style={cls.fontSize2em}>
                    <td style={{...cls.table_td, ...cls.product}}>
                        <div style={{fontWeight: "normal", fontSize: "0.85em"}}>{"Total"}</div>
                    </td>
                    <td style={{...cls.table_td, ...cls.total}}>{`$${Number(totalPrice) + Number(process.env.API_CARGO_ENVIO)}`}</td>
                </tr>
            </table>
        </>
    )
    const Footer = (
        <>
            <h3 style={{...cls.textCenter, ...cls.lineHeight8px}}>{"Gracias por tu compra"}</h3>
            <h4 style={{...cls.textCenter, ...cls.lineHeight8px, ...cls.fontWeightNormal}}>
                {`Tiempo estimado de entrega ${process.env.API_TIEMPO_ENTREGA || 0} dia(s)`}
            </h4>
        </>
    )    
    return (
        <table>
            <tr>
                <td>
                    {Header}
                    <hr/>
                    {DatosEnvio}
                    {InformacionPago}
                    {Productos}
                    <hr/>
                    {Footer}
                </td>
            </tr>
        </table>
    )
}