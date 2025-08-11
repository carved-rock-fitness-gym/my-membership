# Node.js 24 Breaking Changes & Deprecated APIs

This document outlines the breaking changes, deprecated APIs, and removed methods in Node.js 24 that will break existing code.

## 🚨 Removed APIs

### Buffer
- **`SlowBuffer`** - Moved to End-of-Life (EOL)
  - **What breaks**: `SlowBuffer` constructor is no longer available
  - **Migration**: Use `Buffer.allocUnsafeSlow()` instead
  - **Note**: This was reverted in v24.0.1 but deprecated with runtime warnings

### TLS
- **`tls.createSecurePair()`** - Completely removed
  - **What breaks**: Calls to `tls.createSecurePair()` will throw an error
  - **Migration**: Use `tls.TLSSocket` constructor instead

### HTTP
- **`outgoingMessage._headers`** - Removed internal property
- **`outgoingMessage._headersList`** - Removed internal property
  - **What breaks**: Direct access to these internal properties
  - **Migration**: Use `getHeaders()`, `setHeader()`, `removeHeader()` methods

### Filesystem
- **`fs.truncate()` with file descriptor** - Removed ability
  - **What breaks**: `fs.truncate(fd, ...)` calls
  - **Migration**: Use `fs.ftruncate(fd, ...)` instead

- **`dirent.path`** - Removed property
  - **What breaks**: Accessing `.path` on directory entries
  - **Migration**: Track the directory path manually or use full path construction

### Crypto
- **Obsolete Cipher export** - Removed from `lib`
  - **What breaks**: Legacy cipher references
  - **Migration**: Use current crypto APIs

### Process Bindings
- **Six process bindings unexposed** - Internal APIs removed
  - **What breaks**: Direct access to internal process bindings
  - **Migration**: Use public APIs instead

## ⚠️ Runtime Deprecations (Will Break in Future Versions)

### URL
- **`url.parse()`** - Runtime deprecation warnings
  - **What breaks**: Will show deprecation warnings and eventually be removed
  - **Migration**: Use WHATWG URL API (`new URL()`) instead
  ```js
  // Old (deprecated)
  const parsed = url.parse('https://example.com/path')
  
  // New
  const parsed = new URL('https://example.com/path')
  ```

### Filesystem
- **`fs.F_OK`, `fs.R_OK`, `fs.W_OK`, `fs.X_OK`** - Runtime deprecated
  - **What breaks**: Direct use of these constants will show warnings
  - **Migration**: Use the constants from `fs.constants` instead
  ```js
  // Old (deprecated)
  fs.access(file, fs.F_OK)
  
  // New
  fs.access(file, fs.constants.F_OK)
  ```

- **Invalid types in `fs.existsSync()`** - Runtime deprecated
  - **What breaks**: Passing non-string/Buffer/URL types will show warnings
  - **Migration**: Ensure proper type checking before calling

### REPL
- **Instantiating REPL without `new`** - Runtime deprecated
  - **What breaks**: `repl.REPLServer()` without `new` will show warnings
  - **Migration**: Always use `new repl.REPLServer()`

### Zlib
- **Using Zlib classes without `new`** - Deprecated
  - **What breaks**: `zlib.Gzip()` without `new` will show warnings
  - **Migration**: Always use `new zlib.Gzip()`

### Net
- **`_setSimultaneousAccepts()`** - End-of-life deprecated
  - **What breaks**: Calling this internal method will show warnings
  - **Migration**: Use public APIs for connection handling

### TLS
- **`server.prototype.setOptions`** - End-of-life deprecated
  - **What breaks**: Using this method will show warnings
  - **Migration**: Set options during server creation

### Timers
- **Several timer methods** - End-of-life deprecated
  - **What breaks**: Using deprecated timer internals will show warnings
  - **Migration**: Use standard timer APIs

### Child Process
- **Passing `args` to `spawn` and `execFile`** - Deprecated
  - **What breaks**: Certain argument patterns will show warnings
  - **Migration**: Use proper argument structure

## 🏗️ Build & Environment Changes

### Windows Compilation
- **MSVC support removed** - ClangCL now required
  - **What breaks**: Building Node.js on Windows with MSVC
  - **Migration**: Switch to ClangCL for Windows builds

### Platform Support
- **s390 32-bit support removed**
- **ppc 32-bit support removed**
- **ARMv7 support downgraded to experimental**
  - **What breaks**: Building/running on these platforms
  - **Migration**: Use 64-bit variants or alternative platforms

### macOS Requirements
- **Minimum macOS version bumped to 13.5**
- **Minimum Xcode version increased to 16.1**
  - **What breaks**: Building on older macOS/Xcode versions
  - **Migration**: Update to supported versions

## 📦 Major Version Updates

### V8 Engine
- **Updated to V8 13.6** - NODE_MODULE_VERSION increased to 137
  - **What breaks**: Native modules compiled for older V8 versions
  - **Migration**: Recompile native modules

### npm
- **Updated to npm 11**
  - **What breaks**: Potential package compatibility issues
  - **Migration**: Review package dependencies for npm 11 compatibility

## 🔧 Behavioral Changes

### AsyncLocalStorage
- **Now uses `AsyncContextFrame` by default**
  - **What breaks**: Code relying on previous implementation details
  - **Migration**: Update to use the new default behavior

### Test Runner
- **Promises removed from `t.test()` and `test()` returns**
- **Automatic waiting for subtests**
  - **What breaks**: Code expecting promises from test functions
  - **Migration**: Remove manual promise handling in tests

### Stream
- **Error forwarding from `dest.write`**
  - **What breaks**: Error handling expectations may change
  - **Migration**: Update error handling logic

### HTTP/2
- **Session tracking and graceful server close changes**
  - **What breaks**: Custom session management code
  - **Migration**: Adapt to new session lifecycle

### Readline
- **Stricter validation for functions called after closed**
- **Unicode line separators handling fixed**
  - **What breaks**: Code relying on previous loose validation
  - **Migration**: Ensure proper readline lifecycle management

## 🧹 Buffer Changes

- **`buflen` restricted to integer range**
  - **What breaks**: Using non-integer buffer lengths
  - **Migration**: Ensure buffer lengths are valid integers

## ⏰ Timers Changes

- **`clearImmediate` checks for immediate instance**
  - **What breaks**: Passing non-immediate objects to `clearImmediate`
  - **Migration**: Only pass immediate objects returned by `setImmediate`

## 📋 Migration Strategy

1. **Update Dependencies**: Ensure all dependencies support Node.js 24
2. **Run with Warnings**: Test your application with `--trace-deprecation` to catch all deprecation warnings
3. **Replace Deprecated APIs**: Systematically replace deprecated APIs with their modern equivalents
4. **Test Thoroughly**: Run comprehensive tests to catch behavioral changes
5. **Update Build Tools**: Ensure build pipelines support the new requirements

## 🔗 References

- [Node.js 24.0.0 Release Notes](https://nodejs.org/en/blog/release/v24.0.0)
- [Node.js 24.5.0 Release Notes](https://nodejs.org/en/blog/release/v24.5.0)
- [WHATWG URL API Documentation](https://nodejs.org/api/url.html#the-whatwg-url-api)