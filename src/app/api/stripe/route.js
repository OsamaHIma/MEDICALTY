import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const [item] = await req.json();
  try {
    let price;

    if (item.duration === "month") {
      price = 30;
    } else {
      price = 70;
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      locale: "auto",
      customer_email: item.email,
      phone_number_collection: {
        enabled: true,
      },
      subscription_data: {
        description: "Subscription to Medicality",
        trial_period_days: 7,
      },
      custom_text: {
        // shipping_address: {
        //   message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
        // },

        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
      // success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      success_url:item.success_url,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: `By subscribing to this package you will be charged $${price} every ${item.duration}.`,
            },
            unit_amount: item.name === "month" ? 30 * 100 : 70 * 100,
            tax_behavior: "exclusive",
            recurring: {
              interval: item.duration,
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json(session);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
