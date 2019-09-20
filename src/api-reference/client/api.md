# API

## setGateway

The `oasis.setGateway` method configures the client so that all service communication is done through the given :ref:`OasisGateway <gateways>`. This method should be called before interacting with any services.

### setGateway

```javascript
oasis.setGateway(gateway)
```

#### Parameters
1. `gateway` - [OasisGateway](./gateways#OasisGateway): The gateway to facilitate all service communications.
