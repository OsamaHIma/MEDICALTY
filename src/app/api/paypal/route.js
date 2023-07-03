import { paypalInstance } from '@app/subscribe/page';
import { NextResponse } from "next/server";
export default function handler(req, res) {
  const data = paypalInstance.billingAgreements.create({
    token: req.query.token, 
    payer_id: req.query.PayerID  
  });
  
  // Save subscription data
  
  NextResponse.send('Subscription captured!')
}