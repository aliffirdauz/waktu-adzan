import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ❗ must use Service Role Key here
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // You can extend this validation
    if (!body.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 })
    }

    const { error } = await supabase
      .from('subscriptions')
      .insert([body])

    if (error) {
      console.error('Supabase insert error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscription saved successfully!' }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
