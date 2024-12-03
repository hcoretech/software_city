/** @type {import('next').NextConfig} */
 
module.exports = {
    experimental: {
      serverActions: {
        allowedOrigins: ['localhost:3000','localhost:8081', '*.my-proxy.com',"https://software-city.vercel.app","https://vercel.com",],
      },
    },
  }
  const NextConfig ={
    images :{
      remotePatterns :[
        {
          protocol:'https',
          hostname:'www.zwodnik.com',
          
        },
        {
          protocol:'https',
          hostname:'w7.pngwing.com',
          
        }
      ]
      // domains:['www.zwodnik.com']
    }
  }
  module.exports = NextConfig