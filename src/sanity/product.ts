import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", 
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
        name: "priceWithoutDiscount",
        title: "Price Without Discount",
        type: "number",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "discountPercentage",
        title: "Discount Percentage",
        type: "number",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "rating",
        title: "Rating",
        type: "number",
        validation: (Rule) => Rule.required(),
      },
      {
        name:"isNew",
        type:"boolean",
        title:"New Badge",
    },
    {
        name:"slogan",
        type:"string",
        title:"Slogan",
    }
    ],
  });
