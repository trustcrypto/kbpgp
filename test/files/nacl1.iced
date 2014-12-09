
{nacl} = require '../../lib/main'
{bufeq_fast} = require '../../lib/util'

#=================================================================

dsig = asig = pair = null

#---------------------------------

exports.gen_eddsa = (T,cb) ->
  await nacl.eddsa.Pair.generate {}, T.esc(defer(tmp))
  pair = tmp
  cb()

#---------------------------------

msg = new Buffer """To the Congress of the United States: Yesterday, Dec. 7, 1941 - a
date which will live in infamy - the United States of America was suddenly and
deliberately attacked by naval and air forces of the Empire of Japan.""", "utf8"

#---------------------------------

exports.sign_attached_1 = (T, cb) ->
  await pair.sign { payload : msg, detached : false }, T.esc(defer(tmp), cb)
  asig = tmp
  cb()

#---------------------------------

exports.verify_attached_1 = (T, cb) ->
  await pair.verify { sig : asig, detached : false }, T.esc(defer(out), cb)
  T.assert bufeq_fast(out, msg), "got right payload back"

  # Verify and check that the right payload was inside
  await pair.verify { sig : asig, detached : false, payload : msg }, T.esc(defer(out), cb)

  msg2 = new Buffer msg
  msg2[0]++
  await pair.verify { sig : asig, detached : false, payload : msg2 }, defer err, out
  T.assert err?, "get an error if the payload is wrong"

  asig2 = new Buffer asig
  asig2[10]++
  await pair.verify { sig : asig2, detached : false, payload : msg }, defer err, out
  T.assert err?, "get an error if the sig s wrong"

  cb()

#---------------------------------

exports.sign_detached_1 = (T,cb) ->
  await pair.sign { payload : msg, detached : true }, T.esc(defer(tmp), cb)
  dsig = tmp
  cb()

#---------------------------------

exports.verify_dettached_1 = (T, cb) ->
  await pair.verify { sig : dsig, detached : true, payload : msg}, T.esc(defer(out), cb)

  msg2 = new Buffer msg
  msg2[0]++
  await pair.verify { sig : dsig, detached : true, payload : msg2 }, defer err, out
  T.assert err?, "get an error if the payload is wrong"

  dsig2 = new Buffer dsig
  dsig2[10]++
  await pair.verify { sig : dsig2, detached : true, payload : msg }, defer err, out
  T.assert err?, "get an error if the sig s wrong"

  cb()

#---------------------------------
