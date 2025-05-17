import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Make sure this is the SERVICE ROLE
)

export async function POST(req: NextRequest) {
  try {
    const subscription = await req.json()

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ error: "Invalid subscription payload" }, { status: 400 })
    }

    const { endpoint, keys } = subscription
    const { auth, p256dh } = keys

    const { error } = await supabase.from("subscriptions").insert([
      {
        endpoint,
        auth,
        p256dh,
      },
    ])

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Subscription saved successfully!" }, { status: 200 })
  } catch (err: any) {
    console.error("Subscription route error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
