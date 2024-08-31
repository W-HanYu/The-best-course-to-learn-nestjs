# websocket

实时的双向数据通信，我们一般会用 `WebSocket` 来做。

`HTTP` 的协议格式我们很清楚，就是 `header、body` 这些。

那 `WebSocket` 的协议格式是什么样的呢？

这节我们就用 `Node` 来实现下 `WebSocket` 协议的解析。

`WebSocket` 严格来说和 `HTTP` 没什么关系，是另外一种协议格式。但是需要一次从 `HTTP` 到 `WebSocket` 的切换过程。
[协议切换](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66a631eacea541b8a21077f3a70a7d30~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

请求的时候带上这几个 `header`:

```sh
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: JkE58n3uIigYDMvC+KsBbGZsp1A=

```

和请求 `header` 类似，`Sec-WebSocket-Accept` 是对请求带过来的 `Sec-WebSocket-Key` 处理之后的结果。

加入这个 `header` 的校验是为了确定对方一定是有 `WebSocket` 能力的，不然万一建立了连接对方却一直没消息，那不就白等了么。

那 `Sec-WebSocket-Key `经过什么处理能得到 `Sec-WebSocket-Accept` 呢？

我用 `node` 实现了一下，是这样的：

```js
const crypto = require("crypto");

function hashKey(key) {
  const sha1 = crypto.createHash("sha1");
  sha1.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
  return sha1.digest("base64");
}
```

这个字符串 `258EAFA5-E914-47DA-95CA-C5AB0DC85B11 `是固定的

# 总结

实时性较高的需求，我们会用 `websocket` 实现，比如即时通讯、游戏等场景。

`websocket` 和 `http` 没什么关系，但从 `http` 到 `websocket` 需要一次切换的过程。

这个切换过程除了要带 upgrade 的 header 外，还要带 `sec-websocket-key`，服务端根据这个 `key` 算出结果，通过 `sec-websocket-accept` 返回。响应是 `101 Switching Protocols` 的状态码。

这个计算过程比较固定，就是 `key + 固定的字符串` 通过 `sha1` 加密后再 `base64` 的结果。

加这个机制是为了确保对方一定是 `websocket` 服务器，而不是随意返回了个 `101` 状态码。

之后就是 `websocket` 协议了，这是个二进制协议，我们根据格式完成了 `websocket` 帧的解析和生成。

这样就是一个完整的 `websocket` 协议的实现了。
