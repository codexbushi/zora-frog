import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'
import { Zora1155ABI } from './zora-abi.js'

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
      <Button.Transaction target="/mint">Transaction Mint</Button.Transaction>,
      <Button.Mint target="eip155:8453:0x04c376fa8fcc8a9991a8513b75bb3fd9d37581c8:1">
        Mint
      </Button.Mint>,
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

app.transaction('/mint', (c) => {
  const { address } = c
  console.log('address', address)

  return c.contract({
    abi: Zora1155ABI,
    functionName: 'mintWithRewards',
    args: [
      '0x04c376fa8fcc8a9991a8513b75bb3fd9d37581c8',
      1n,
      1n,
      '0x',
      '0xf7e89E45502890381F9242403eA8661fad89Ca79',
    ],
    chainId: 'eip155:8453',
    // chainId: 'eip155:84532',
    to: '0x04c376fa8fcc8a9991a8513b75bb3fd9d37581c8',
    // to: '0xf35b08E176da8178443dE6720817CA10e2408f9c',
  })
})

if (import.meta.env?.MODE === 'development') devtools(app, { serveStatic })
else devtools(app, { assetsPath: '/.frog' })

export const GET = handle(app)
export const POST = handle(app)
