import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
})

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      // <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ],
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    ),
  })
})

app.transaction('/send-ether', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:84532',
    to: '0xf7e89E45502890381F9242403eA8661fad89Ca79',
    value: parseEther(inputText || '0'),
  })
})

if (import.meta.env?.MODE === 'development') devtools(app, { serveStatic })
else devtools(app, { assetsPath: '/.frog' })

export const GET = handle(app)
export const POST = handle(app)
