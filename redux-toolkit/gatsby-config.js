module.exports = {
  plugins: [
    `gatsby-plugin-smoothscroll`,
    'gatsby-plugin-top-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          firestore: true,
        },        
        credentials: {
          apiKey: "AIzaSyCSiQhDxjluUNwLIQ0hdjki3TFU23RW0fc",
          authDomain: "sivar-things.firebaseapp.com",
          databaseURL: "https://sivar-things.firebaseio.com",
          projectId: "sivar-things",
          storageBucket: "sivar-things.appspot.com",
          messagingSenderId: "886356013107",
          appId: "1:886356013107:web:3bfac2f9de8b9504e97346",
          measurementId: "G-C3LZH1VYCB"
        }        
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `${__dirname}/src/`,
        pages: `${__dirname}/src/pages/`,
        components: `${__dirname}/src/components`
      }
    },  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images/products`,
        name: "products"
      },
    },    
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Dosis']
        }
      }
    },  
  ],
  siteMetadata: {
    title: 'Sivar Things',
  },
};
