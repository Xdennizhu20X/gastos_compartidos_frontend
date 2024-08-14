"use client";
import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function CardsComponent() {
  const list = [
    {
      title: "Salida",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },


  ];

  return (
    <div  className=" gap-10  flex flex-wrap justify-center">
      {list.map((item, index) => (
        <Card className=" animate-swing-drop-in  w-72 h-52 bg-[#181a32] border-2  border-purple-300 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]" style={{ animationDelay: `${index * 100}ms` }} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              
              alt={item.title}
              className="w-full object-cover h-[150px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
