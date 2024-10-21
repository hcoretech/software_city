'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./ui/card"
import { swipe } from "../constants/icon"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"


export const CarouselPlugin = () => {
    
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" justify-center py-6 w-screen"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {swipe.map((data, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className={`bg-${data.color} `}>
                <CardContent className="flex items-center justify-center p-10">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Image src={data.image} alt="image" width={100} height={100}  />
                </CardContent>
                <div>{data.name}</div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
