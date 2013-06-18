({
  baseUrl: "libs",
  paths:{
    requireLib:"../components/requirejs/require"
  },
  name: "../main",
  include: ["requireLib"],
  out: "main-built.js"
})