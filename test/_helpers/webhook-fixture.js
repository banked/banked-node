import crypto from "crypto";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

const payload = `{
  "amount": 1,
  "created_at": "2019-10-31 16:45:34 UTC",
  "currency": "GBP",
  "end_to_end_id": null,
  "error_url": "https://example.com/error",
  "id": "a6941fd1-f5cb-4948-814d-df03540149fb",
  "line_items": [
    {
      "amount": 1,
      "currency": "GBP",
      "description": null,
      "name": "Candle",
      "quantity": 1
    }
  ],
  "live": true,
  "payee": {
    "account_number": "12345678",
    "name": "Gerard Wiley",
    "sort_code": "123456"
  },
  "reference": "Illuminate",
  "state": "awaiting_payer",
  "success_url": "https://example.com/success",
  "url": "https://banked.me/pay/a6941fd1-f5cb-4948-814d-df03540149fb"
}`;
const signature =
  "f063a7029d6b959d8cc11e23148a302929da113a6b0671238ab9d1bcfb63645a";

const buildWebhook = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const hmac = crypto
    .createHmac("sha256", signature)
    .update(`${timestamp}.${payload}`);
  return {
    payload_header: `${timestamp}.${hmac.digest("hex")}`,
    payload,
    signature,
    time_range: {
      start: subDays(new Date(), 7).toISOString(),
      end: addDays(new Date(), 7).toISOString()
    }
  };
};

export default buildWebhook;
