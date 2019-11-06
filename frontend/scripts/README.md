# Scripts for loading data in a KF cluster

This script is the equivalent of `test/e2e/make_requests.sh`, but uses the gRPC-web API via 
`@improbable-eng/grpc-web-node-http-transport` and generated protocol buffers rather than JSON 
files and `cURL`.

## How to use:

* Port-forward to port 8080 in your cluster. (`npm run start:proxy` or however you see fit).
* Run `edit_tsconfig.sh` (or execute the steps manually if you don't have `jq` and `sponge` ) to
  make `tsc` more amenable to usage of this script.
* A the bottom of the file, call `methods.<methodName>()`
* Run the script

```
npx ts-node scripts/index.ts
```

or 

```
node --require ts-node/register index.ts 
```

## PATH dependencies

* `jq`
* `sponge`

Both dependencies are optional. If you don't have them, you can edit `ts-config.json` before running
the script. The `compilerOptions` to change are:

```
{
  "compilerOptions":
    "module": "commonjs", // reset to "esnext"
    "isolatedModules": false, // reset to true
  }    
}
``` 
