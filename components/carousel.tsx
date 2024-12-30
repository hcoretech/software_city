'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./ui/card"
import { swipe } from "../constants/icon"
import Image from "next/image"
import { useEffect } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Suspense } from "react"


export const CarouselPlugin = () => {
   
  useEffect(()=>{

  },[swipe])
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" justify-center w-screen"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {swipe.map((data, index) => {
          const colordata = data.color;
          const check  = colordata === data.color;
          const active = check && `bg-${data.color}`;

          return(
          <CarouselItem key={index}>
            <div >
            {/* <h1 className="font-bold"> Updates</h1> */}
              <Card className={active}>             
                <CardContent className="flex items-center justify-center p-10">
                  {/* <Suspense fallback={<h1> loading</h1>}> */}
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Image className="w-[100px] h-100[px]" src={data.image} alt="image"  width={100} height={100}  />
                  {/* </Suspense> */}
                </CardContent>
                <div className="">{data.name}</div>
              </Card>
            </div>
          </CarouselItem>
        )})}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
