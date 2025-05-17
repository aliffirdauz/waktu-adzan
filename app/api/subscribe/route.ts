import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()
  const { endpoint, keys } = body

  if (!endpoint || !keys?.auth || !keys?.p256dh) {
    return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 })
  }

  const { error } = await supabase.from('subscriptions').insert({
    endpoint,
    auth: keys.auth,
    p256dh: keys.p256dh,
  })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Subscription saved' }, { status: 201 })
}
