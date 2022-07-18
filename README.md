## JOTTER!

Jotter is a Tauri based decentralized note-taking application for the web and desktop, written in Rust/JS.

Jotter uses IPFS to store your notes securely, offering you a seamless experience at 0 cost.

Find our quick demo of the MVP here - https://youtu.be/JmC5LI6a8zs

---

### Setup

#### Running the Server

1. `cd server`
2. `node index.js` - This will start the interim server

#### Running the client

_Debug_

1. Go to the root of the project
2. `npm run start` - Run the debug mode of the project

_Release_

1. `npm run build` - Build the client
2. `npm i -g serve` - Install the `serve` package executable
3. `serve -s build` - Run the production build

---

### Roadmap

- [x] IPFS Implementation
- [x] Wallet Integrations [Metamask, WalletConnect]
- [ ] Use typescript everywhere
- [ ] Implement an editor in Tauri (https://tauri.app/)
- [ ] Implement tags and note-taking widgets

---

### Contributing

- Pull requestes are welcome
