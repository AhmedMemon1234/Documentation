import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: "2024-12-18.acacia" });

export async function POST(req: Request) {
    try {
        const { cart } = await req.json();

        if (!cart || cart.length === 0) {
            return NextResponse.json({ error: "Cart is Empty" }, { status: 500 });
        }

        // Calculate subtotal based on item price and quantity
        const subtotal = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
        const shippingFee = 50; // Fixed shipping fee
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shippingFee + tax;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "https://final-hackathon-3-qt34.vercel.app/success",
            line_items: [
                ...cart.map((item: any) => ({
                    price_data: {
                        currency: "usd",
                        product_data: { name: item.name },
                        unit_amount: Math.round((item.price * 1.1) * 100), // 10% tax included in product price
                    },
                    quantity: item.quantity,
                })),
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Shipping Fee" },
                        unit_amount: shippingFee * 100, // Convert to cents
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                subtotal: subtotal.toFixed(2),
                shippingFee: shippingFee.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2),
            },
        });

        return NextResponse.json({ id: session.id });
    } catch (e) {
        console.error("Stripe Error", e);
        return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 });
    }
}
