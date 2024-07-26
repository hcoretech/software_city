
export default function RootLayout({
    children
     }:Readonly<{
       children:React.ReactNode
   }>){
   
       return(
           <main className="min-h-screen w-full flex">
             {children}
           </main>
       )
   }